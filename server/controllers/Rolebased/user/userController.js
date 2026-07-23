const User = require("../../../models/User");
const response = require("../../../utils/ResponseHandler")
module.exports = {
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");

      if (!user) {
        return response.error(res, 404, "User not found");
      }

      return response.success(res, 200, "Profile retrieved successfully", user);
    } catch (error) {
      console.log(error.message);
      return response.error(res, 500, "Something went wrong");
    }
  },
};