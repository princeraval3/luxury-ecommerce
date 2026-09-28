const express = require("express");

const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// get all orders
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

// get single order
router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getOrderById
);

// update order status
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

module.exports = router;