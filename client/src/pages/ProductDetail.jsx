import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";

import {
  FiHeart,
  FiShare2,
  FiTruck,
  FiRotateCcw,
  FiCheckCircle,
  FiChevronRight,
  FiMinus,
  FiPlus,
} from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  // get single product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        if (data.success) {
          setProduct(data.product);
          setSelectedSize(data.product.sizes?.[0] || "");
        }
      } catch (error) {
        console.log("failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // add product to cart
  const handleAddToCart = async () => {
    try {
      if (product.stock <= 0) {
        alert("product is out of stock");
        return;
      }

      const data = await addToCart({
        productId: product._id,
        quantity,
        size: selectedSize,
        color:
          product.colors?.length > 0
            ? product.colors[selectedColor]
            : "",
      });

      if (data.success) {
        alert("product added to cart");
      }
    } catch (error) {
      console.log("add to cart error:", error);

      alert(
        error.response?.data?.message ||
          "failed to add product to cart"
      );
    }
  };

  // loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <p className="text-sm text-gray-500">loading product...</p>
      </div>
    );
  }

  // product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <p className="text-sm text-gray-500">product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-sans text-gray-800 pb-20">
      {/* NAVBAR HEADER */}
      <header className="bg-[#111111] text-white px-4 sm:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-serif tracking-[0.2em] font-light">
          LUXE
        </h1>

        <div className="text-xs font-medium tracking-wider">
          Bag (3)
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">

        {/* BREADCRUMB */}
        <nav className="text-[11px] text-gray-500 flex items-center gap-1 mb-6">
          <span>Home</span>
          <FiChevronRight className="text-[10px]" />

          <span>{product.category}</span>
          <FiChevronRight className="text-[10px]" />

          <span>{product.subCategory || product.category}</span>
          <FiChevronRight className="text-[10px]" />

          <span className="text-gray-900 font-medium">
            {product.name}
          </span>
        </nav>

        {/* MAIN PRODUCT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* LEFT: IMAGES GALLERY */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {/* Main Big Photo */}
            <div className="w-full aspect-4/5 bg-gray-200 rounded-lg overflow-hidden border border-gray-200/80">
              <img
                src={product.images?.[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails Row */}
            <div className="grid grid-cols-4 gap-3">
              {product.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                    selectedImage === index
                      ? "border-[#C5A059]"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: DETAILS & ACTIONS */}
          <div className="lg:col-span-5 flex flex-col justify-between">

            <div>

              {/* Brand Name */}
              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-semibold mb-1">
                {product.brand || "LUXE"}
              </p>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-serif font-normal text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <div className="flex items-center text-amber-500">
                  {"★".repeat(5)}
                </div>

                <span className="font-semibold text-gray-800">
                  5.0
                </span>

                <span>·</span>

                <span>Customer reviews</span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mt-5">

                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                  ₹{product.price?.toLocaleString()}
                </span>

                {product.discount > 0 && (
                  <span className="bg-[#C5A059]/20 text-[#8B6B2E] text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="mt-2">
                {product.stock > 0 ? (
                  <p className="text-xs text-green-600">
                    {product.stock} items available
                  </p>
                ) : (
                  <p className="text-xs text-red-500">
                    out of stock
                  </p>
                )}
              </div>

              {/* Offers */}
              <div className="mt-4 pt-4 border-t border-gray-200/80 space-y-1">
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                  OFFERS
                </p>

                <p className="text-xs text-[#8B6B2E] cursor-pointer hover:underline flex items-center gap-1">
                  Special offers available on this product
                  <span className="text-[10px]">→</span>
                </p>
              </div>

              {/* Size Selector */}
              {product.sizes?.length > 0 && (
                <div className="mt-6">

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-700">
                      SIZE
                    </span>

                    <button className="text-[11px] text-gray-500 hover:text-black underline">
                      Size Guide →
                    </button>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 w-12 rounded border text-xs font-semibold transition ${
                          selectedSize === size
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-800 border-gray-300 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors?.length > 0 && (
                <div className="mt-6">

                  <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-700 block mb-2">
                    COLOR
                  </span>

                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`px-3 py-2 rounded border text-xs transition ${
                          selectedColor === idx
                            ? "bg-black text-white border-black"
                            : "bg-white text-gray-800 border-gray-300 hover:border-black"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-6">

                <span className="text-[11px] uppercase tracking-wider font-semibold text-gray-700 block mb-2">
                  QTY
                </span>

                <div className="inline-flex items-center border border-gray-300 rounded bg-white">

                  <button
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                    className="p-2 text-gray-600 hover:text-black"
                  >
                    <FiMinus className="text-xs" />
                  </button>

                  <span className="px-4 text-xs font-semibold text-gray-800">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(
                        product.stock > 0
                          ? Math.min(quantity + 1, product.stock)
                          : quantity + 1
                      )
                    }
                    className="p-2 text-gray-600 hover:text-black"
                  >
                    <FiPlus className="text-xs" />
                  </button>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="w-full py-3.5 bg-black text-white text-xs uppercase tracking-widest font-medium rounded hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {product.stock <= 0
                    ? "Out of Stock"
                    : "Add to Bag"}
                </button>

                <button className="w-full py-3.5 bg-[#C5A059] text-white text-xs uppercase tracking-widest font-medium rounded hover:bg-[#b08d4a] transition">
                  Buy Now
                </button>

              </div>

              {/* Wishlist & Share */}
              <div className="flex items-center gap-6 mt-4 text-xs text-gray-600">

                <button className="flex items-center gap-1.5 hover:text-black">
                  <FiHeart />
                  Save to Wishlist
                </button>

                <button className="flex items-center gap-1.5 hover:text-black">
                  <FiShare2 />
                  Share
                </button>

              </div>

              {/* Delivery Features */}
              <div className="mt-6 pt-4 border-t border-gray-200/80 flex flex-wrap gap-4 text-[11px] text-gray-600">

                <span className="flex items-center gap-1.5">
                  <FiTruck className="text-gray-800" />
                  Free delivery
                </span>

                <span className="flex items-center gap-1.5">
                  <FiRotateCcw className="text-gray-800" />
                  Easy 30-day returns
                </span>

                <span className="flex items-center gap-1.5">
                  <FiCheckCircle className="text-gray-800" />
                  100% Authentic
                </span>

              </div>

            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-16 border-b border-gray-200">

          <div className="flex gap-8 text-xs font-semibold text-gray-500 overflow-x-auto">

            {["description", "specifications", "reviews", "delivery"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 capitalize transition whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-black text-black font-bold"
                      : "hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              )
            )}

          </div>
        </div>

        {/* TAB CONTENTS */}
        <div className="py-6 text-xs text-gray-600 leading-relaxed max-w-3xl">

          {activeTab === "description" && (
            <p>{product.description}</p>
          )}

          {activeTab === "specifications" && (
            <div className="grid grid-cols-2 gap-3 max-w-md">

              <div className="border-b border-gray-200 pb-2">
                <span className="font-semibold text-gray-800">
                  Brand:{" "}
                </span>
                <span>{product.brand || "-"}</span>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <span className="font-semibold text-gray-800">
                  Category:{" "}
                </span>
                <span>{product.category}</span>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <span className="font-semibold text-gray-800">
                  Sub Category:{" "}
                </span>
                <span>{product.subCategory || "-"}</span>
              </div>

              <div className="border-b border-gray-200 pb-2">
                <span className="font-semibold text-gray-800">
                  Stock:{" "}
                </span>
                <span>{product.stock}</span>
              </div>

            </div>
          )}

          {activeTab === "reviews" && (
            <p>See all customer feedback below.</p>
          )}

          {activeTab === "delivery" && (
            <p>
              Standard shipping takes 3-5 business days. Express
              options available at checkout.
            </p>
          )}

        </div>

        {/* CUSTOMER REVIEWS */}
        <div className="mt-10">

          <h2 className="text-lg font-serif font-medium text-gray-900 mb-6">
            Customer Reviews
          </h2>

          <div className="bg-white p-5 rounded-lg border border-gray-200/80 shadow-2xs">

            <div className="flex items-center justify-between mb-2">

              <span className="text-xs font-bold text-gray-900">
                Customer
              </span>

              <div className="text-amber-500 text-xs">
                {"★".repeat(5)}
              </div>

            </div>

            <p className="text-xs text-gray-600">
              No customer reviews available yet.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;