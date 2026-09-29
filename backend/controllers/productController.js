const Product = require("../models/Product");
const cloudinary = require("../services/cloudinaryService");

// =========================
// CREATE PRODUCT
// =========================
const createProduct = async (req, res) => {
  try {
    const imageUrls = [];

    for (const file of req.files || []) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "luxury-products",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(file.buffer);
      });

      imageUrls.push(result.secure_url);
    }

    const product = await Product.create({
      ...req.body,
      images: imageUrls,
    });

    res.status(201).json({
      success: true,
      message: "product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to create product",
      error: error.message,
    });
  }
};

// =========================
// GET ALL PRODUCTS
// =========================
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to get products",
      error: error.message,
    });
  }
};

// =========================
// SEARCH PRODUCTS
// =========================
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "search query is required",
      });
    }

    const searchQuery = q.trim();

    const products = await Product.find({
      $or: [
        {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        },
        {
          brand: {
            $regex: searchQuery,
            $options: "i",
          },
        },
        {
          category: {
            $regex: searchQuery,
            $options: "i",
          },
        },
        {
          subCategory: {
            $regex: searchQuery,
            $options: "i",
          },
        },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to search products",
      error: error.message,
    });
  }
};

// =========================
// GET PRODUCT BY ID
// =========================
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to get product",
      error: error.message,
    });
  }
};

// =========================
// UPDATE PRODUCT
// =========================
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      discount: req.body.discount,
      category: req.body.category,
      subCategory: req.body.subCategory,
      brand: req.body.brand,
      stock: req.body.stock,
      sizes: Array.isArray(req.body.sizes)
        ? req.body.sizes
        : req.body.sizes
        ? [req.body.sizes]
        : [],
      colors: Array.isArray(req.body.colors)
        ? req.body.colors
        : req.body.colors
        ? [req.body.colors]
        : [],
      isFeatured: req.body.isFeatured === "true",
    };

    // agar new images upload hui hain
    if (req.files && req.files.length > 0) {
      const imageUrls = [];

      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "luxury-products",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          stream.end(file.buffer);
        });

        imageUrls.push(result.secure_url);
      }

      updateData.images = imageUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to update product",
      error: error.message,
    });
  }
};

// =========================
// DELETE PRODUCT
// =========================
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to delete product",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  searchProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};