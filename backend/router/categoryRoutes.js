const express = require("express");

const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// get all categories
router.get("/", getAllCategories);

// create category
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createCategory
);

// update category
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateCategory
);

// delete category
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategory
);

module.exports = router;