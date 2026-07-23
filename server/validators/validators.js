const { body, validationResult } = require("express-validator");

// Reusable middleware to catch & format validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

module.exports = {
  // Registration validation rules
  register: [
    body("firstName")
      .trim()
      .notEmpty().withMessage("First name is required"),

    body("lastName")
      .optional()
      .trim(),

    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Please enter a valid email address")
      .normalizeEmail(),

    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    handleValidationErrors,
  ],

  // Login validation rules
  login: [
    body("email")
      .trim()
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Please enter a valid email address")
      .normalizeEmail(),

    body("password")
      .notEmpty().withMessage("Password is required"),

    handleValidationErrors,
  ],
};