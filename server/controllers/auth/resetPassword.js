const User = require("../../models/User");
const response = require("../../utils/ResponseHandler");
const { sendOTPEmail } = require("../../mail/mail"); // Adjust path based on your folder structure
const bcrypt = require("bcrypt");
const { redisClient } = require("../../config/redis");
const otpRateLimiter = require("../../utils/rateLimiter");
const otpCooldown = require("../../utils/otpCooldown");


module.exports = {
  sendOTP: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return response.error(res, 404, "User not found");
      }
      const canSendOTP = await otpCooldown(
        `otp-cooldown:${email}`,
        60
      )
      if (!canSendOTP) {
        return response.error(res, 429, "Please wait before requesting another otp")
      }

      const allowed = await otpRateLimiter(
        `otp-limit:${email}`,
        3, // max 3 requests
        900 // 15 minutes
      )
      if (!allowed) {
        return response.error(res, 429, "Too many otp requests")
      }
      const emailResult = await sendOTPEmail(email);
      if (!emailResult.success) {
        return response.error(
          res,
          500,
          "Failed to send OTP email. Please try again later.",
        );
      }

      await redisClient.set(
        `otp:${email}`,
        emailResult.otp.toString(),
        {
          EX: 300, // 5 minutes expiry
        });


      await redisClient.del(
        `otp-verify-limit:${email}`
      );


      return response.success(
        res,
        200,
        "OTP Sent Successfully on the registered email address",
      );
    } catch (error) {
      console.error("Reset Password Error:", error);
      return response.error(res, 500, "Internal server error");
    }
  },

  verifyOTP: async (req, res) => {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return response.error(res, 404, "User does not exist");
      }
      const storedOtp = await redisClient.get(`otp:${email}`);
      if (!storedOtp) {
        return response.error(res, 400, "OTP has expired or not was not requested")
      }

      const allowed = await otpRateLimiter(
        `otp-verify-limit:${email}`,
        3,      // maximum 3 attempts
        300     // 5 minutes
      );

      if (!allowed) {
        return response.error(
          res,
          429,
          "Too many OTP attempts. Please try again later."
        );
      }
      if (storedOtp !== otp.toString()) {
        return response.error(res, 400, "Invalid OTP")
      }

      await redisClient.set(
        `password-reset-verified:${email}`,
        "true",
        {
          EX: 300 // 5 minutes
        }
      );

      await redisClient.del(`otp:${email}`);
      await redisClient.del(`otp-verify-limit:${email}`);

      return response.success(res, 200, "OTP verified successfully");

    } catch (error) {
      console.error("Verify OTP Error:", error.message);  
      return response.error(res, 500, "Internal Server Error");
    }
  },

  newPassword: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return response.error(res, 404, "User does not exist");
      }
      const isVerified = await redisClient.get(
        `password-reset-verified:${email}`
      );

      if (!isVerified) {
        return response.error(
          res,
          400,
          "OTP verification required"
        );
      }

      const isSamePassword = await bcrypt.compare(
        password,
        user.password
      )

      if (isSamePassword) {
        return response.error(res, 400, "New password can not be same as the old password")
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
      await redisClient.del(
        `password-reset-verified:${email}`
      );
      return response.success(res, 200, "Password reset successfully");
    } catch (error) {
      console.error("New Password Error:", error.message);
      return response.error(res, 500, "Internal Server Error");
    }
  },
};
