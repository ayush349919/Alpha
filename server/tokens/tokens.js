const jwt = require("jsonwebtoken");

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

// --- GENERATE TOKENS ---

const createAccessToken = (user) => {
  return jwt.sign({ id: user._id || user.id, email: user.email, role: user.role }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (user) => {
  return jwt.sign({ id: user._id || user.id, email: user.email }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const generateTokens = (user) => {
  return {
    accessToken: createAccessToken(user),
    refreshToken: createRefreshToken(user),
  };
};

// --- VERIFY TOKENS ---

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch (error) {
    return null; 
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  generateTokens,
  verifyAccessToken, 
  verifyRefreshToken,
};