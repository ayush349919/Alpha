const User = require("../../models/User");
const response = require("../../utils/ResponseHandler");
const bcrypt = require("bcrypt");
const {
  generateTokens,
  verifyRefreshToken,
  createAccessToken,
} = require("../../tokens/tokens");

module.exports = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return response.error(res, 409, "User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      const { accessToken, refreshToken } = generateTokens(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return response.success(res, 201, "User registered successfully", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accessToken,
      });
    } catch (error) {
      console.log(error.message);
      return response.error(res, 500, "Something went wrong");
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return response.error(res, 401, "Invalid credentials");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return response.error(res, 401, "Invalid credentials");
      }

      const { accessToken, refreshToken } = generateTokens(user);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return response.success(res, 200, "Login successful", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        accessToken,
      });
    } catch (error) {
      console.log(error.message);
      return response.error(res, 500, "Something went wrong");
    }
  },
  refreshAccessToken: async (req, res) => {
    try {
      const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

      if (!refreshToken) {
        return response.error(res, 401, "Please login again.");
      }

      const decoded = verifyRefreshToken(refreshToken);
      if (!decoded) {
        return response.error(res, 403, "Refresh token is invalid or expired.");
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return response.error(res, 404, "User not found.");
      }

      const newAccessToken = createAccessToken(user);
      return res.status(200).json({
        message: "Token refreshed successfully",
        accessToken: newAccessToken,
      });
    } catch (error) {
      console.error(error);
      return response.error(res, 500, "Internal server Error");
    }
  },
};
