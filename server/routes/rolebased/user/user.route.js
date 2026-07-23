const express = require("express");
const router = express.Router();
const tokenVerfication = require("../../../middlewares/verifyToken");
const userController = require("../../../controllers/Rolebased/user/userController");

router.get("/profile", tokenVerfication, userController.getProfile);

module.exports = router
