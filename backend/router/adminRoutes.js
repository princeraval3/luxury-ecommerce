const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { getAdminDashboard } = require("../controllers/adminController");

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, getAdminDashboard);

router.get("/admin-test", authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "admin access granted",
  });
});

module.exports = router;
