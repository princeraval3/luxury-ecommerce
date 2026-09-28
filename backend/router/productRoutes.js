const express = require("express");

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductById
} = require("../controllers/productController");

const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// =========================
// GET ALL PRODUCTS
// =========================

router.get("/", getAllProducts);

// singlee product router 
router.get("/:id", getProductById);
// =========================
// CREATE PRODUCT
// ADMIN ONLY
// =========================



router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 5),
  createProduct
);

// =========================
// UPDATE PRODUCT
// ADMIN ONLY
// =========================

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.array("images", 5),
  updateProduct
);

// =========================
// DELETE PRODUCT
// ADMIN ONLY
// =========================

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

module.exports = router;