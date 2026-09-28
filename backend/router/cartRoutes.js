const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", authMiddleware, getCart);

router.post("/add", authMiddleware, addToCart);

router.put("/update/:itemId", authMiddleware, updateCartItem);

router.delete("/remove/:itemId", authMiddleware, removeFromCart);

router.delete("/clear", authMiddleware, clearCart);

module.exports = router;