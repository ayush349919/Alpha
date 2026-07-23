const jwt = require("jsonwebtoken");

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

// --- GENERATE TOKENS ---

const createAccessToken = (user) => {
  return jwt.sign({ id: user._id || user.id, email: user.email }, ACCESS_SECRET, {
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

// Access Token verify karne ke liye
const verifyAccessToken = (token) => {
  try {
    // Agar token valid hai, toh yeh decoded payload return karega
    return jwt.verify(token, ACCESS_SECRET);
  } catch (error) {
    // Token expire ho gaya ho ya invalid ho, toh null return karega
    return null; 
  }
};

// Refresh Token verify karne ke liye
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
  verifyAccessToken,  // Export the new functions
  verifyRefreshToken,
};