import React, { useEffect, useState } from "react";
import { FiLock, FiTrash2, FiMinus, FiPlus } from "react-icons/fi";

import {
  getCart,
  updateCartItem,
  removeFromCart,
} from "../services/cartService";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);

  // get cart from backend
  const fetchCart = async () => {
    try {
      const data = await getCart();

      if (data.success) {
        setCartItems(data.cart?.items || []);
      }
    } catch (error) {
      console.log("failed to fetch cart:", error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // update quantity
  const updateQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        return;
      }

      const data = await updateCartItem(itemId, newQuantity);

      if (data.success) {
        setCartItems(data.cart?.items || []);
      }
    } catch (error) {
      console.log("failed to update quantity:", error);

      alert(
        error.response?.data?.message ||
          "failed to update quantity"
      );
    }
  };

  // remove item
  const removeItem = async (itemId) => {
    try {
      const data = await removeFromCart(itemId);

      if (data.success) {
        setCartItems(data.cart?.items || []);
      }
    } catch (error) {
      console.log("failed to remove item:", error);

      alert(
        error.response?.data?.message ||
          "failed to remove item"
      );
    }
  };

  // loading
  if (loading) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">
          loading cart...
        </p>
      </div>
    );
  }

  // calculations
  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.product?.price || 0) * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const memberDiscount =
    subtotal > 0 ? Math.round(subtotal * 0.1) : 0;

  const finalTotal = subtotal - memberDiscount;

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-sans text-gray-800 pb-20">

      {/* NAVBAR HEADER */}
      <header className="bg-[#111111] text-white px-6 sm:px-12 py-5 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-serif tracking-[0.25em] font-light">
          LUXE
        </h1>
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12">

        {/* TITLE HEADER */}
        <div className="flex items-baseline gap-4 mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-gray-900">
            Your Bag
          </h1>

          <span className="text-xs sm:text-sm text-gray-500 font-light">
            {totalItems}{" "}
            {totalItems === 1 ? "item" : "items"}
          </span>
        </div>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80 my-8">

            <h2 className="text-xl font-serif text-gray-900 mb-2">
              Your bag is currently empty
            </h2>

            <p className="text-xs text-gray-500 mb-6">
              Explore our luxury collection to add products to your bag.
            </p>

            <a
              href="/shop"
              className="inline-block px-8 py-3 bg-black text-white text-xs uppercase tracking-widest font-medium rounded-full hover:bg-gray-800 transition"
            >
              Continue Shopping
            </a>

          </div>
        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT: CART ITEMS LIST */}
            <div className="lg:col-span-7 space-y-6">

              {cartItems.map((item) => (

                <div
                  key={item._id}
                  className="flex gap-4 sm:gap-6 pb-6 border-b border-gray-200/80 items-start relative group"
                >

                  {/* Product Image */}
                  <div className="w-24 h-32 sm:w-28 sm:h-36 bg-gray-200/80 rounded-md overflow-hidden shrink-0 border border-gray-200/60">

                    <img
                      src={item.product?.images?.[0]}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between self-stretch pt-1">

                    <div>

                      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-1">
                        {item.product?.brand || "LUXE"}
                      </p>

                      <h3 className="text-base sm:text-lg font-serif font-medium text-gray-900 leading-snug">
                        {item.product?.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1.5 font-light">
                        Size: {item.size || "N/A"}
                        &nbsp;·&nbsp;
                        Color: {item.color || "N/A"}
                      </p>

                    </div>

                    {/* Quantity Controls & Remove */}
                    <div className="flex items-center gap-4 mt-4">

                      <div className="inline-flex items-center border border-gray-300 rounded bg-white">

                        {/* Minus */}
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-gray-600 hover:text-black transition disabled:text-gray-300 disabled:cursor-not-allowed"
                        >
                          <FiMinus className="text-[10px]" />
                        </button>

                        <span className="px-2.5 text-xs font-medium text-gray-800">
                          {item.quantity}
                        </span>

                        {/* Plus */}
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 text-gray-600 hover:text-black transition"
                        >
                          <FiPlus className="text-[10px]" />
                        </button>

                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-gray-400 hover:text-red-500 text-xs transition p-1"
                        title="Remove item"
                      >
                        <FiTrash2 />
                      </button>

                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-1 text-right">

                    <p className="text-base sm:text-lg font-semibold text-gray-900">
                      ₹
                      {(
                        (item.product?.price || 0) *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>
              ))}

            </div>

            {/* RIGHT: ORDER SUMMARY CARD */}
            <div className="lg:col-span-5 lg:sticky lg:top-8">

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-2xs space-y-6">

                <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-900 pb-4 border-b border-gray-100">
                  ORDER SUMMARY
                </h2>

                <div className="space-y-4 text-xs">

                  {/* Subtotal */}
                  <div className="flex justify-between items-center text-gray-600">

                    <span>
                      Subtotal ({totalItems} items)
                    </span>

                    <span className="font-semibold text-gray-900">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>

                  </div>

                  {/* Delivery */}
                  <div className="flex justify-between items-center text-gray-600">

                    <span>Delivery</span>

                    <span className="font-bold text-xs uppercase text-gray-900 tracking-wider">
                      FREE
                    </span>

                  </div>

                  {/* Member Discount */}
                  <div className="flex justify-between items-center text-gray-600">

                    <span>Member Discount (10%)</span>

                    <span className="font-semibold text-[#B38E46]">
                      - ₹{memberDiscount.toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

                {/* Total Line */}
                <div className="pt-4 border-t border-gray-900/80 flex justify-between items-baseline">

                  <span className="text-sm font-bold text-gray-900">
                    Total
                  </span>

                  <span className="text-xl sm:text-2xl font-bold text-gray-900">
                    ₹{finalTotal.toLocaleString("en-IN")}
                  </span>

                </div>

                {/* Promo Code Input */}
                <div className="flex gap-2 pt-2">

                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) =>
                      setPromoCode(e.target.value)
                    }
                    className="flex-1 px-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black transition"
                  />

                  <button
                    onClick={() => setAppliedPromo(true)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-800 text-xs font-semibold rounded-lg hover:bg-gray-200 transition"
                  >
                    Apply
                  </button>

                </div>

                {/* Checkout Button */}
                <button className="w-full py-4 bg-[#111111] text-white text-xs uppercase tracking-widest font-semibold rounded-xl hover:bg-gray-800 transition duration-200 flex items-center justify-center gap-2 shadow-xs">
                  Proceed to Checkout
                  <span>→</span>
                </button>

                {/* Security Tag */}
                <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-light pt-1">

                  <FiLock className="text-xs" />

                  <span>
                    Secure checkout · 256-bit SSL
                  </span>

                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;