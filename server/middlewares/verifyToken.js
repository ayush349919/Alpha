const { verifyAccessToken } = require("../tokens/tokens");
const response = require("../utils/ResponseHandler");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return response.error(res, 401, "Access token is required.");
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);

  if (!decoded) {
    return response.error(res, 401, "Access token is invalid or expired.");
  }

  req.user = decoded;
  next();
};

module.exports = verifyToken;