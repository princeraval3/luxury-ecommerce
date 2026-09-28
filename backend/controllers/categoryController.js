const Category = require("../models/Category");

// =========================
// CREATE CATEGORY
// =========================

const createCategory = async (req, res) => {
  try {
    const { name, description, image, isActive } = req.body;

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "category already exists",
      });
    }

    const category = await Category.create({
      name,
      description,
      image,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to create category",
      error: error.message,
    });
  }
};

// =========================
// GET ALL CATEGORIES
// =========================

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to get categories",
      error: error.message,
    });
  }
};

// =========================
// UPDATE CATEGORY
// =========================

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "category not found",
      });
    }

    const { name, description, image, isActive } = req.body;

    if (name && name.trim() !== category.name) {
      const existingCategory = await Category.findOne({
        name: name.trim(),
        _id: { $ne: req.params.id },
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "category already exists",
        });
      }
    }

    category.name = name ?? category.name;
    category.description = description ?? category.description;
    category.image = image ?? category.image;

    if (isActive !== undefined) {
      category.isActive =
        isActive === true || isActive === "true";
    }

    await category.save();

    res.status(200).json({
      success: true,
      message: "category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to update category",
      error: error.message,
    });
  }
};

// =========================
// DELETE CATEGORY
// =========================

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to delete category",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};