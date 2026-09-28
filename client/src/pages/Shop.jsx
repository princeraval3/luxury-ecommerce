import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiFilter,
  FiX,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiChevronDown,
  FiSliders,
} from "react-icons/fi";

import { getProducts } from "../services/productService";

const categories = ["All", "watches", "jewelry", "shoes", "dresses"];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.log("failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // filter products
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesPrice = product.price <= maxPrice;

      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") {
        return a.price - b.price;
      }

      if (sortBy === "price-high") {
        return b.price - a.price;
      }

      // latest products first
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <p className="text-sm text-gray-500">loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-sans pb-20">

      {/* HEADER BANNER */}
      <section className="bg-[#111111] text-white py-12 sm:py-16 text-center px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-2">
            THE EXCLUSIVE CATALOG
          </p>

          <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-wide">
            Shop Luxury Collection
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 font-light mt-3 max-w-md mx-auto">
            Discover hand-crafted garments, timeless cuts, and modern
            essentials tailored for elegance.
          </p>
        </div>
      </section>

      {/* BREADCRUMB & CONTROLS BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">

          {/* SEARCH BOX */}
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-xs focus:outline-none focus:border-black transition"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-xs"
              >
                <FiX />
              </button>
            )}
          </div>

          {/* ACTION RIGHT */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">

            {/* MOBILE FILTER */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-800 hover:bg-gray-50 transition"
            >
              <FiSliders className="text-sm text-[#C5A059]" />
              Filters
            </button>

            {/* SORT */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 hidden sm:inline-block">
                Sort by:
              </span>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-full px-4 py-2.5 pr-8 text-xs font-medium text-gray-800 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured Items</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        <div className="flex gap-8">

          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8">

            {/* CATEGORIES */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-200">
                Categories
              </h3>

              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left text-xs py-1.5 px-3 rounded-lg transition ${
                      selectedCategory === cat
                        ? "bg-black text-white font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE FILTER */}
            <div>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
                  Max Price
                </h3>

                <span className="text-xs font-bold text-[#C5A059]">
                  ₹{maxPrice.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />

              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>₹5,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* RESET */}
            <button
              onClick={() => {
                setSelectedCategory("All");
                setMaxPrice(50000);
                setSearchQuery("");
                setSortBy("featured");
              }}
              className="w-full py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition"
            >
              Reset Filters
            </button>
          </aside>

          {/* PRODUCT GRID */}
          <div className="flex-1">

            <div className="flex justify-between items-center mb-6">
              <p className="text-xs text-gray-500 font-light">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                results
              </p>
            </div>

            {/* NO PRODUCTS */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-200/80">

                <FiFilter className="mx-auto text-3xl text-gray-300 mb-3" />

                <h3 className="text-base font-serif font-medium text-gray-900">
                  No products found
                </h3>

                <p className="text-xs text-gray-500 mt-1 mb-4">
                  Try adjusting your filters or search terms.
                </p>

                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setMaxPrice(50000);
                    setSearchQuery("");
                    setSortBy("featured");
                  }}
                  className="px-6 py-2 bg-black text-white text-xs uppercase tracking-wider rounded-full hover:bg-gray-800 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (

              /* PRODUCT CARDS */
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

                {filteredProducts.map((product) => (
                 <Link
                      to={`/product/${product._id}`}
                      
                      key={product._id}
                      className="bg-white rounded-xl overflow-hidden border border-gray-200/70 group shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between"
>
                    

                    {/* IMAGE */}
                    <div className="relative aspect-3/4 overflow-hidden bg-gray-100">

                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />

                      {/* WISHLIST */}
                      <button
                        onClick={() => toggleWishlist(product._id)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                          wishlist.includes(product._id)
                            ? "bg-red-500 text-white"
                            : "bg-white/80 text-gray-700 hover:bg-white"
                        }`}
                      >
                        <FiHeart className="text-xs fill-current" />
                      </button>
                    </div>

                    {/* CARD BODY */}
                    <div className="p-4 flex flex-col justify-between flex-1">

                      <div>

                        <div className="flex items-center justify-between gap-1 mb-1">

                          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                            {product.category}
                          </p>

                        </div>

                        <h3 className="text-xs sm:text-sm font-serif font-medium text-gray-900 group-hover:text-[#C5A059] transition line-clamp-1">
                          {product.name}
                        </h3>

                      </div>

                      {/* PRICE */}
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">

                        <p className="text-sm font-bold text-gray-900">
                          ₹{product.price?.toLocaleString()}
                        </p>

                        <button className="p-2.5 bg-[#111111] text-white rounded-full hover:bg-[#C5A059] hover:text-black transition shadow-xs">
                          <FiShoppingCart className="text-xs" />
                        </button>

                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER OVERLAY */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">

          {/* BACKDROP */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* DRAWER */}
          <div className="relative w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col justify-between z-10 shadow-xl">

            <div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">

                <h2 className="text-sm font-serif font-semibold uppercase tracking-wider text-gray-900">
                  Filter Products
                </h2>

                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-gray-500 hover:text-black"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {/* MOBILE CATEGORIES */}
              <div className="mb-6">

                <h3 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                  Category
                </h3>

                <div className="space-y-1.5">

                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left text-xs py-2 px-3 rounded-lg transition ${
                        selectedCategory === cat
                          ? "bg-black text-white font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}

                </div>
              </div>

              {/* MOBILE PRICE */}
              <div className="mb-6">

                <div className="flex justify-between items-center mb-3">

                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
                    Max Price
                  </h3>

                  <span className="text-xs font-bold text-[#C5A059]">
                    ₹{maxPrice.toLocaleString()}
                  </span>

                </div>

                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black cursor-pointer"
                />
              </div>
            </div>

            {/* APPLY */}
            <div className="pt-4 border-t border-gray-200 space-y-2">

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm"
              >
                Apply Filters
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;