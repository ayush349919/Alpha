const { verifyAccessToken } = require("../tokens/tokens"); 
const response = require("../utils/ResponseHandler");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.error(res, 401, "Access denied. No token provided.");
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return response.error(res, 403, "Invalid or expired access token");
  }
  req.user = decoded; 
  next();
};

module.exports = verifyToken;