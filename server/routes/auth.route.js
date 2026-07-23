const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/authController");
const validator = require("../validators/validators"); // validations with the help of express-validator

router.post("/register", validator.register, authController.register);
router.post("/login", validator.login, authController.login);
router.post("/refresh-token", authController.refreshAccessToken)


module.exports = router;
