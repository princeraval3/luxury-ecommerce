const User = require("../models/user");

const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    res.status(200).json({
      success: true,
      totalUsers,
      totalAdmins,
    });
  } catch (error) {

     res.status(500).json({
      success: false,
      message: "server error",
    });
  
  }
};



module.exports = {
  getAdminDashboard,
};