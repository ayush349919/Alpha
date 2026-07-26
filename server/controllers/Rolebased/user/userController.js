const { redisClient } = require("../../../config/redis");
const User = require("../../../models/User");
const response = require("../../../utils/ResponseHandler")
const bcrypt = require('bcrypt')
module.exports = {
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password -role");

      if (!user) {
        return response.error(res, 404, "User not found");
      }

      return response.success(res, 200, "Profile retrieved successfully", user);
    } catch (error) {
      console.log(error.message);
      return response.error(res, 500, "Something went wrong");
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) {
        return response.error(res, 404, "User not found")
      }

      if (firstName !== undefined) {
        user.firstName = firstName;
      }

      if (lastName !== undefined) {
        user.lastName = lastName;
      }

      await user.save()
      return response.success(
        res,
        200,
        "Profile updated successfully",
        {
          firstName: user.firstName,
          lastName: user.lastName
        }
      );

    } catch (error) {
      console.error(error);
      return response.error(res, 500, "Something went wrong");

    }
  },
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) {
        return response.error(res, 404, "User not found");
      }
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return response.error(res, 400, "Current password is incorrect");
      }

      const samePassword = await bcrypt.compare(
        newPassword,
        user.password
      );

      if (samePassword) {
        return response.error(res, 400, "New password cannot be same as old password");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      user.passwordChangedAt = new Date();
      await user.save()
      await redisClient.del(`refresh:${user._id}`);

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      return response.success(res, 200, "Password changed Successfull please login again");

    } catch (error) {
      console.error("Change Password Error:", error);
      return response.error(
        res,
        500,
        "Internal Server Error"
      );
    }
  },
  deleteAccount: async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return response.error(res, 404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return response.error(
        res,
        400,
        "Invalid password"
      );
    }
 // this will be done if the user type right password 

    await redisClient.del(
      `refresh:${user._id}`
    );

    await User.findByIdAndDelete(
      user._id
    );

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
 // ----------------------------

    return response.success(
      res,
      200,
      "Account deleted successfully"
    );
  } catch (error) {
    console.error(
      "Delete Account Error:",
      error
    );

    return response.error(
      res,
      500,
      "Internal Server Error"
    );
  }
},
  
};
