const { body, validationResult } = require("express-validator");

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

  validateSendOTP: [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),

    handleValidationErrors,
  ],

  validateVerifyOTP: [
    body('email')
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),


    body('otp')
      .trim()
      .notEmpty()
      .withMessage('OTP is required')
      .isNumeric()
      .withMessage('OTP must contain only numbers')
      .isLength({ min: 6, max: 6 })
      .withMessage('OTP must be 6 digits'),

    handleValidationErrors,
  ],

  validateNewPassword: [
    body('email')
      .trim()
      .toLowerCase()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),

    body('otp')
      .trim()
      .notEmpty()
      .withMessage('OTP is required')
      .isLength({ min: 6, max: 6 })
      .withMessage('OTP must be 6 digits')
      .isNumeric()
      .withMessage('OTP must contain only numbers'),

    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),

    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm password is required')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),

    handleValidationErrors,
  ],

  updateProfile: [
    body("firstName")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("First name cannot be empty"),

    body("lastName")
      .optional()
      .trim(),

    handleValidationErrors,

  ],

  changePassword: [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),

    body("newPassword")
      .notEmpty()
      .withMessage("New password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),

    handleValidationErrors,
  ],

  deleteAccount: [
    body("password")
      .notEmpty()
      .withMessage("Password is required"),

    handleValidationErrors,
  ],



};