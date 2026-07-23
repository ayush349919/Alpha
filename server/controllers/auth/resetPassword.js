const User = require("../../models/User");
const response = require("../../utils/ResponseHandler");
const { sendOTPEmail } = require("../../mail/mail"); // Adjust path based on your folder structure
const bcrypt = require("bcrypt");

module.exports = {
  sendOTP: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return response.error(res, 404, "User not found");
      }
      const emailResult = await sendOTPEmail(email);

      if (!emailResult.success) {
        return response.error(
          res,
          500,
          "Failed to send OTP email. Please try again later.",
        );
      }

      user.otp = emailResult.otp;
      user.otpExpires = Date.now() + 5 * 60 * 1000;
      await user.save();

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
      if (!user.otp || !user.otpExpires) {
        return response.error(res, 400, "No OTP requested for this user");
      }

      if (Date.now() > user.otpExpires) {
        return response.error(
          res,
          400,
          "OTP has expired. Please request a new one.",
        );
      }
      if (Number(otp) !== user.otp) {
        return response.error(res, 400, "Invalid OTP");
      }

      return response.success(res, 200, "OTP verified successfully");
    } catch (error) {
      console.error("Verify OTP Error:", error.message);
      return response.error(res, 500, "Internal Server Error");
    }
  },

  newPassword: async (req, res) => {
    try {
      const { email, otp, password } = req.body; // confirmPassword is validated, but not needed here

      const user = await User.findOne({ email });
      if (!user) {
        return response.error(res, 404, "User does not exist");
      }

      if (!user.otp || !user.otpExpires) {
        return response.error(res, 400, "No active OTP request found");
      }

      if (Date.now() > user.otpExpires) {
        return response.error(
          res,
          400,
          "OTP has expired. Please request a new one.",
        );
      }

      if (Number(otp) !== user.otp) {
        return response.error(res, 400, "Invalid OTP");
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      user.otp = null;
      user.otpExpires = null;
      await user.save();

      return response.success(res, 200, "Password reset successfully");
    } catch (error) {
      console.error("New Password Error:", error.message);
      return response.error(res, 500, "Internal Server Error");
    }
  },
};
