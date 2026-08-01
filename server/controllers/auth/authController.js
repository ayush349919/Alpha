const User = require("../../models/User");
const response = require("../../utils/ResponseHandler");
const bcrypt = require("bcrypt");
const {
  generateTokens,
  verifyRefreshToken,
  createAccessToken,
} = require("../../tokens/tokens");
const { redisClient } = require("../../config/redis");

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

      await redisClient.set(
        `refresh:${user._id}`,
        refreshToken,
        {
          EX: 7 * 24 * 60 * 60,  // 7 days expiry
        }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return response.success(res, 201, "User registered successfully", {
        accessToken,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
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

      await redisClient.set(
        `refresh:${user._id}`,
        refreshToken,
        {
          EX: 7 * 24 * 60 * 60,  // 7 days expiry
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return response.success(res, 200, "login successful", {
        accessToken,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.log(error.message);
      return response.error(res, 500, "Something went wrong");
    }
  },

 refreshAccessToken: async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    // No refresh token
    if (!refreshToken) {
      return response.error(res, 401, "Session expired. Please login again.");
    }

    // Verify JWT
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return response.error(res, 401, "Session expired. Please login again.");
    }

    // Check Redis
    const storedToken = await redisClient.get(`refresh:${decoded.id}`);

    if (!storedToken || storedToken !== refreshToken) {
      return response.error(res, 401, "Session expired. Please login again.");
    }

    // Get User
    const user = await User.findById(decoded.id);

    if (!user) {
      return response.error(res, 404, "User not found.");
    }

    // Generate New Access Token
    const newAccessToken = createAccessToken(user);

    return response.success(
      res,
      200,
      "Token refreshed successfully",
      {
        accessToken: newAccessToken,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          email: user.email,
        },
      }
    );
  } catch (error) {
    console.error("Refresh Token Error:", error);
    return response.error(res, 500, "Internal Server Error");
  }
},

  logout: async (req, res) => {
    try {

      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });
        return response.success(res, 200, "Logged out successfully");
      }

      const decoded = verifyRefreshToken(refreshToken)
      if (decoded) {
        await redisClient.del(
          `refresh:${decoded.id}`
        )
      }

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });


      return response.success(res, 200, "logged out successfully");
    } catch (error) {
      console.error("Logout Error:", error);
      return response.error(res, 500, "Internal Server Error during logout");
    }
  },
  //   testRedis : async(req, res) => {
  //   await redisClient.set("name", "Ayush");

  //   const data = await redisClient.get("name");

  //   return res.json({
  //     success: true,
  //     data,
  //   })
  // }
};
