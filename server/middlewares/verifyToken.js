const User = require("../models/User");
const { verifyAccessToken } = require("../tokens/tokens");
const response = require("../utils/ResponseHandler");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.error(res, 401, "Access token is required.");
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return response.error(
        res,
        401,
        "Access token is invalid or expired."
      );
    }

    const user = await User.findById(decoded.id)
      .select("passwordChangedAt");

    if (!user) {
      return response.error(res, 404, "User not found");
    }

    if (
      user.passwordChangedAt &&
      decoded.iat * 1000 < user.passwordChangedAt.getTime()
    ) {
      return response.error(
        res,
        401,
        "Password was changed. Please login again."
      );
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Verify Token Error:", error);
    return response.error(res, 500, "Internal Server Error");
  }
};

module.exports = verifyToken;