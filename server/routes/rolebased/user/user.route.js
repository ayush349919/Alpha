const express = require("express");
const router = express.Router();
const tokenVerfication = require("../../../middlewares/verifyToken");
const userController = require("../../../controllers/Rolebased/user/userController");
const validator =  require("../../../validators/validators")

router.get("/profile", tokenVerfication, userController.getProfile);
router.put("/updateprofile", tokenVerfication, validator.updateProfile, userController.updateProfile);
router.put("/changepassword",tokenVerfication, validator.changePassword,  userController.changePassword)
router.delete("/deleteaccount", tokenVerfication, validator.deleteAccount, userController.dele )

module.exports = router
