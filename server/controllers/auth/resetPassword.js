const User = require("../../models/User");
const response = require("../../utils/ResponseHandler");
const { sendOTPEmail } = require("../../mail/mail");
const bcrypt = require("bcrypt");
const { redisClient } = require("../../config/redis");
const otpRateLimiter = require("../../utils/rateLimiter");
const otpCooldown = require("../../utils/otpCooldown");

module.exports = {
  // SEND OTP
  sendOTP: async (req, res) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      // Prevent email enumeration
      if (!user) {
        return response.success(
          res,
          200,
          "If this email exists, OTP has been sent",
        );
      }

      const canSendOTP = await otpCooldown(`otp-cooldown:${email}`, );

      if (!canSendOTP) {
        return response.error(
          res,
          429,
          "Please wait before requesting another OTP",
        );
      }

      const allowed = await otpRateLimiter(`otp-limit:${email}`, 3, 900);

      if (!allowed) {
        return response.error(res, 429, "Too many OTP requests");
      }

      const emailResult = await sendOTPEmail(email);

      if (!emailResult.success) {
        return response.error(res, 500, "Failed to send OTP email");
      }

      // Hash OTP before storing
      const hashedOTP = await bcrypt.hash(emailResult.otp.toString(), 10);

      await redisClient.set(`otp:${email}`, hashedOTP, {
        EX: 300,
      });

      // reset verify attempts
      await redisClient.del(`otp-verify-limit:${email}`);

      return response.success(res, 200, "OTP sent successfully");
    } catch (error) {
      console.error("Send OTP Error:", error.message);

      return response.error(res, 500, "Internal server error");
    }
  },

  // VERIFY OTP
  verifyOTP: async (req, res) => {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return response.error(res, 400, "Invalid request");
      }

      const storedOtp = await redisClient.get(`otp:${email}`);

      if (!storedOtp) {
        return response.error(res, 400, "OTP expired or not requested");
      }

      const allowed = await otpRateLimiter(`otp-verify-limit:${email}`, 3, 300);

      if (!allowed) {
        return response.error(res, 429, "Too many OTP attempts");
      }

      const isValidOTP = await bcrypt.compare(otp.toString(), storedOtp);

      if (!isValidOTP) {
        return response.error(res, 400, "Invalid OTP");
      }

      await redisClient.set(`password-reset-verified:${user._id}`, "true", {
        EX: 300,
      });

      await redisClient.del(`otp:${email}`);

      await redisClient.del(`otp-verify-limit:${email}`);

      return response.success(res, 200, "OTP verified successfully");
    } catch (error) {
      console.error("Verify OTP Error:", error.message);

      return response.error(res, 500, "Internal Server Error");
    }
  },

  // RESET PASSWORD
  newPassword: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return response.error(res, 404, "User does not exist");
      }

      // Password validation

      if (password.length < 12) {
        return response.error(
          res,
          400,
          "Password must contain at least 12 characters",
        );
      }

      const isVerified = await redisClient.get(
        `password-reset-verified:${user._id}`,
      );

      if (!isVerified) {
        return response.error(res, 400, "OTP verification required");
      }

      const isSamePassword = await bcrypt.compare(password, user.password);

      if (isSamePassword) {
        return response.error(
          res,
          400,
          "New password cannot be same as old password",
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;

      await user.save();

      // logout all sessions
      await redisClient.del(`refresh:${user._id}`);

      await redisClient.del(`password-reset-verified:${user._id}`);

      return response.success(res, 200, "Password reset successfully");
    } catch (error) {
      console.error("New Password Error:", error.message);

      return response.error(res, 500, "Internal Server Error");
    }
  },
};
