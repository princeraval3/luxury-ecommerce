const Cart = require("../models/Cart");
const Product = require("../models/Product");

// add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size = "", color = "" } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "product id is required",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "not enough stock",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            product: productId,
            quantity,
            size,
            color,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.size === size &&
          item.color === color
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > product.stock) {
          return res.status(400).json({
            success: false,
            message: "not enough stock",
          });
        }

        existingItem.quantity = newQuantity;
      } else {
        cart.items.push({
          product: productId,
          quantity,
          size,
          color,
        });
      }

      await cart.save();
    }

    const updatedCart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    return res.status(200).json({
      success: true,
      message: "product added to cart",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to add product to cart",
      error: error.message,
    });
  }
};


// get cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        success: true,
        cart: {
          items: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to get cart",
      error: error.message,
    });
  }
};


// update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "cart not found",
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "cart item not found",
      });
    }

    const product = await Product.findById(item.product);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: "not enough stock",
      });
    }

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    return res.status(200).json({
      success: true,
      message: "cart updated",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to update cart",
      error: error.message,
    });
  }
};


// remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "cart not found",
      });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "cart item not found",
      });
    }

    item.deleteOne();

    await cart.save();

    const updatedCart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    return res.status(200).json({
      success: true,
      message: "item removed from cart",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to remove item",
      error: error.message,
    });
  }
};


// clear cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "cart already empty",
      });
    }

    cart.items = [];

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "cart cleared",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "failed to clear cart",
      error: error.message,
    });
  }
};


module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};