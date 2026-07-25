const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/authController");
const passController = require("../controllers/auth/resetPassword");
const validator = require("../validators/validators"); // validations with the help of express-validator

router.post("/register", validator.register, authController.register);
router.post("/login", validator.login, authController.login);
router.post("/refreshAccessToken", authController.refreshAccessToken);
router.post("/logout", authController.logout);


// password reset flow
router.post("/sendotp", passController.sendOTP);
router.post("/verifyotp",validator.validateVerifyOTP, passController.verifyOTP);
router.post("/newpassword", validator.validateNewPassword, passController.newPassword);

// router.get('/', authController.testRedis)

module.exports = router;
