import React, { useEffect, useMemo, useState } from "react";
import {
  FiHeart,
  FiChevronRight,
  FiFilter,
  FiX,
  FiStar,
  FiEye,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import { addToCart } from "../services/cartService";

const NewArrivals = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState(1000000);
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        if (data.success) setProducts(data.products || []);
      } catch (error) {
        console.error("failed to fetch new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const newArrivalProducts = useMemo(() => {
    return [...products].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    );
  }, [products]);

  const categoryProducts = useMemo(() => {
    if (selectedCategory === "All") return newArrivalProducts;
    return newArrivalProducts.filter((product) => {
      const category = product.category?.toLowerCase();
      if (selectedCategory === "Women") return category === "women";
      if (selectedCategory === "Men") return category === "men";
      if (selectedCategory === "Accessories")
        return category === "accessories" || category === "accessory";
      if (selectedCategory === "Footwear")
        return (
          category === "footwear" || category === "shoes" || category === "shoe"
        );
      return false;
    });
  }, [newArrivalProducts, selectedCategory]);

  const subCategories = useMemo(
    () => [
      ...new Set(categoryProducts.map((p) => p.subCategory).filter(Boolean)),
    ],
    [categoryProducts],
  );
  const brands = useMemo(
    () => [...new Set(categoryProducts.map((p) => p.brand).filter(Boolean))],
    [categoryProducts],
  );
  const sizes = useMemo(
    () => [...new Set(categoryProducts.flatMap((p) => p.sizes || []))],
    [categoryProducts],
  );
  const colors = useMemo(
    () => [...new Set(categoryProducts.flatMap((p) => p.colors || []))],
    [categoryProducts],
  );

  const filteredProducts = useMemo(() => {
    let result = [...categoryProducts];
    if (selectedSubCategory !== "All")
      result = result.filter((p) => p.subCategory === selectedSubCategory);
    if (selectedBrands.length)
      result = result.filter((p) => selectedBrands.includes(p.brand));
    if (selectedSizes.length)
      result = result.filter((p) =>
        (p.sizes || []).some((size) => selectedSizes.includes(size)),
      );
    if (selectedColors.length)
      result = result.filter((p) =>
        (p.colors || []).some((color) => selectedColors.includes(color)),
      );
    result = result.filter((p) => Number(p.price || 0) <= priceRange);
    if (selectedRating !== "All")
      result = result.filter(
        (p) => Number(p.rating || 0) >= Number(selectedRating),
      );
    if (sortBy === "Price Low to High")
      result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    if (sortBy === "Price High to Low")
      result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    if (sortBy === "Top Rated")
      result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    if (sortBy === "Newest")
      result.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    return result;
  }, [
    categoryProducts,
    selectedSubCategory,
    selectedBrands,
    selectedSizes,
    selectedColors,
    priceRange,
    selectedRating,
    sortBy,
  ]);

  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  const toggleBrand = (brand) =>
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand],
    );
  const toggleSize = (size) =>
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );
  const toggleColor = (color) =>
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color],
    );

  const clearFilters = () => {
    setSelectedSubCategory("All");
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange(1000000);
    setSelectedRating("All");
    setSortBy("Recommended");
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory("All");
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedRating("All");
  };

  const handleAddToCart = async (product) => {
    try {
      if (Number(product.stock || 0) <= 0)
        return alert("product is out of stock");
      const data = await addToCart({
        productId: product._id,
        quantity: 1,
        size: product.sizes?.[0] || "",
        color: product.colors?.[0] || "",
      });
      if (data.success) alert("product added to cart");
    } catch (error) {
      console.log("add to cart error:", error);
      alert(error.response?.data?.message || "failed to add product to cart");
    }
  };

  const hasActiveFilters =
    selectedSubCategory !== "All" ||
    selectedBrands.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange < 1000000 ||
    selectedRating !== "All" ||
    sortBy !== "Recommended";

  const FilterContent = () => (
    <div className="space-y-7">
      {subCategories.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">
            Category
          </h3>
          <select
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none"
          >
            <option value="All">All categories</option>
            {subCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">
          Price
        </h3>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none"
        >
          <option value={1000000}>All prices</option>
          <option value={25000}>Under ₹25,000</option>
          <option value={50000}>Under ₹50,000</option>
          <option value={100000}>Under ₹1,00,000</option>
          <option value={250000}>Under ₹2,50,000</option>
        </select>
      </div>

      {brands.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">
            Brand
          </h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">
          Rating
        </h3>
        <div className="space-y-2">
          {["All", "4", "4.5", "5"].map((rating) => (
            <label
              key={rating}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="new-arrival-rating"
                checked={selectedRating === rating}
                onChange={() => setSelectedRating(rating)}
              />
              <span>
                {rating === "All" ? "All ratings" : `${rating}★ & above`}
              </span>
            </label>
          ))}
        </div>
      </div>

      {sizes.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">
            Size
          </h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-2 border rounded-lg text-xs ${selectedSizes.includes(size) ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-widest font-semibold mb-3">
            Color
          </h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className={`px-3 py-2 border rounded-lg text-xs ${selectedColors.includes(color) ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200"}`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-sans text-gray-800 pb-24">
      {/* <header className="bg-[#111111] text-white px-6 sm:px-12 py-5 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <h1 onClick={() => navigate("/")} className="text-xl sm:text-2xl font-serif tracking-[0.25em] font-light cursor-pointer">LUXE</h1>
        <div className="text-xs font-medium tracking-wider bg-white/10 px-3 py-1.5 rounded-full border border-white/20">Bag</div>
      </header> */}

      <div className="relative bg-[#141414] text-white py-16 sm:py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-3xl mx-auto relative z-10 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-bold block">
            — AUTUMN / WINTER '26 DROP —
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-wide">
            New Arrivals
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-lg mx-auto pt-1 leading-relaxed">
            Unveil our handpicked high-fashion collection crafted with exquisite
            perfection and timeless aesthetics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <nav className="text-[11px] text-gray-500 flex items-center gap-1.5 mb-8">
          <span
            onClick={() => navigate("/")}
            className="hover:text-black cursor-pointer"
          >
            Home
          </span>
          <FiChevronRight className="text-[10px]" />
          <span className="text-gray-900 font-semibold">New Arrivals</span>
        </nav>

        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200/80 pb-4 mb-6 gap-4">
          <div className="flex gap-6 sm:gap-8 text-xs font-semibold uppercase tracking-wider overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {["All", "Women", "Men", "Accessories", "Footwear"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`transition-all whitespace-nowrap pb-1 relative ${selectedCategory === cat ? "text-black font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black" : "text-gray-400 hover:text-black"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-400 font-light self-end sm:self-auto">
            Showing{" "}
            <span className="text-black font-semibold">
              {filteredProducts.length}
            </span>{" "}
            luxury styles
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between border-b border-gray-200/80 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <FiFilter className="text-gray-500" />
            <span className="text-xs uppercase tracking-widest font-semibold">
              Filters
            </span>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[10px] uppercase tracking-wider text-red-500 hover:text-red-700 ml-2"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {subCategories.length > 0 && (
              <select
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-xs outline-none"
              >
                <option value="All">All categories</option>
                {subCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            )}
            <select
              value=""
              onChange={(e) => e.target.value && toggleBrand(e.target.value)}
              className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-xs outline-none"
            >
              <option value="">Brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {selectedBrands.includes(brand) ? `✓ ${brand}` : brand}
                </option>
              ))}
            </select>
            {sizes.length > 0 && (
              <select
                value=""
                onChange={(e) => e.target.value && toggleSize(e.target.value)}
                className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-xs outline-none"
              >
                <option value="">Size</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {selectedSizes.includes(size) ? `✓ ${size}` : size}
                  </option>
                ))}
              </select>
            )}
            {colors.length > 0 && (
              <select
                value=""
                onChange={(e) => e.target.value && toggleColor(e.target.value)}
                className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-xs outline-none"
              >
                <option value="">Color</option>
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {selectedColors.includes(color) ? `✓ ${color}` : color}
                  </option>
                ))}
              </select>
            )}
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-xs outline-none"
            >
              <option value="All">Rating</option>
              <option value="4">4★ & above</option>
              <option value="4.5">4.5★ & above</option>
              <option value="5">5★</option>
            </select>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-xs outline-none"
            >
              <option value={1000000}>Price</option>
              <option value={25000}>Under ₹25,000</option>
              <option value={50000}>Under ₹50,000</option>
              <option value={100000}>Under ₹1,00,000</option>
              <option value={250000}>Under ₹2,50,000</option>
              <option value={1000000}>All prices</option>
            </select>
            <div className="relative">
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-gray-200 bg-white rounded-lg pl-3 pr-8 py-2 text-xs outline-none"
              >
                <option value="Recommended">Recommended</option>
                <option value="Newest">Newest</option>
                <option value="Price Low to High">Price Low to High</option>
                <option value="Price High to Low">Price High to Low</option>
                <option value="Top Rated">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between mb-8">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 bg-white rounded-lg text-xs uppercase tracking-wider font-semibold"
          >
            <FiFilter />
            Filters
          </button>
          <div className="relative">
            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border border-gray-200 bg-white rounded-lg pl-3 pr-8 py-2.5 text-xs outline-none"
            >
              <option value="Recommended">Recommended</option>
              <option value="Newest">Newest</option>
              <option value="Price Low to High">Price Low to High</option>
              <option value="Price High to Low">Price High to Low</option>
              <option value="Top Rated">Top Rated</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-8">
            {selectedSubCategory !== "All" && (
              <button
                onClick={() => setSelectedSubCategory("All")}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[10px]"
              >
                {selectedSubCategory}
                <FiX />
              </button>
            )}
            {selectedBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[10px]"
              >
                {brand}
                <FiX />
              </button>
            ))}
            {selectedSizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[10px]"
              >
                {size}
                <FiX />
              </button>
            ))}
            {selectedColors.map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[10px]"
              >
                {color}
                <FiX />
              </button>
            ))}
            {priceRange < 1000000 && (
              <button
                onClick={() => setPriceRange(1000000)}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[10px]"
              >
                Under ₹{priceRange.toLocaleString("en-IN")}
                <FiX />
              </button>
            )}
            {selectedRating !== "All" && (
              <button
                onClick={() => setSelectedRating("All")}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[10px]"
              >
                {selectedRating}★+
                <FiX />
              </button>
            )}
          </div>
        )}

        <main>
          {loading ? (
            <div className="py-20 text-center text-sm text-gray-500">
              loading new arrivals...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-serif text-gray-800">
                no products found
              </p>
              <p className="text-xs text-gray-500 mt-2">
                try changing your filters or category.
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 px-5 py-2.5 bg-black text-white text-xs uppercase tracking-wider rounded-lg"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {filteredProducts.map((product) => {
                const productImage =
                  product.images?.[0] ||
                  "https://via.placeholder.com/600x800?text=LUXE";
                const rating = Number(product.rating || 0);
                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl transition duration-300 flex flex-col justify-between group"
                  >
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                      <img
                        src={productImage}
                        alt={product.name}
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out cursor-pointer"
                      />
                      <span className="absolute top-4 left-4 text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[#111111] text-white shadow-md">
                        NEW ARRIVAL
                      </span>
                      {product.isFeatured && (
                        <span className="absolute top-12 left-4 text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-[#C5A059] text-black shadow-md">
                          FEATURED
                        </span>
                      )}
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <button
                          onClick={() => toggleWishlist(product._id)}
                          className="bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-600 hover:text-red-500 transition shadow-sm"
                          title="Save to Wishlist"
                        >
                          <FiHeart
                            className={`text-sm ${wishlist.includes(product._id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </button>
                        <button
                          onClick={() => setQuickViewItem(product)}
                          className="bg-white/90 backdrop-blur-md p-2 rounded-full text-gray-600 hover:text-black transition shadow-sm opacity-0 group-hover:opacity-100 duration-200"
                          title="Quick Preview"
                        >
                          <FiEye className="text-sm" />
                        </button>
                      </div>
                      {Number(product.stock || 0) <= 0 && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <span className="bg-white text-black px-4 py-2 text-xs uppercase tracking-widest font-semibold rounded-lg">
                            Out of stock
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex justify-between items-center mb-1 gap-3">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                            {product.brand || "LUXE"}
                          </p>
                          <div className="flex items-center text-[11px] text-amber-500 gap-1">
                            <FiStar className="fill-amber-500 text-amber-500 text-[10px]" />
                            <span className="text-gray-700 font-semibold">
                              {rating > 0 ? rating : "—"}
                            </span>
                          </div>
                        </div>
                        <h3
                          onClick={() => navigate(`/product/${product._id}`)}
                          className="text-base font-serif font-medium text-gray-900 group-hover:text-[#C5A059] transition cursor-pointer"
                        >
                          {product.name}
                        </h3>
                        {product.subCategory && (
                          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                            {product.subCategory}
                          </p>
                        )}
                      </div>
                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                        <div>
                          <p className="text-base font-bold text-gray-900">
                            ₹
                            {Number(product.price || 0).toLocaleString("en-IN")}
                          </p>
                          {Number(product.discount || 0) > 0 && (
                            <p className="text-[11px] text-gray-400">
                              {product.discount}% off
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={Number(product.stock || 0) <= 0}
                          className={`px-5 py-3 text-[10px] uppercase tracking-widest font-semibold rounded-xl transition duration-200 shadow-sm ${Number(product.stock || 0) <= 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[#111111] text-white hover:bg-[#C5A059] hover:text-black"}`}
                        >
                          {Number(product.stock || 0) <= 0
                            ? "Out of Stock"
                            : "Add to Bag"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {showMobileFilters && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between z-10">
              <h2 className="font-serif text-lg">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 rounded-full bg-gray-100"
              >
                <FiX />
              </button>
            </div>
            <div className="p-5">
              <FilterContent />
              <div className="flex gap-3 pt-7">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 border border-gray-200 rounded-lg text-xs uppercase tracking-wider"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 py-3 bg-black text-white rounded-lg text-xs uppercase tracking-wider"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {quickViewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setQuickViewItem(null)}
          />
          <div className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden z-10 shadow-2xl grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              onClick={() => setQuickViewItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-full bg-gray-100 z-10"
            >
              <FiX className="text-lg" />
            </button>
            <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={
                  quickViewItem.images?.[0] ||
                  "https://via.placeholder.com/600x800?text=LUXE"
                }
                alt={quickViewItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between py-2">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                  {quickViewItem.brand || "LUXE"}
                </span>
                <h2 className="text-xl font-serif font-normal text-gray-900 mt-1">
                  {quickViewItem.name}
                </h2>
                <p className="text-lg font-bold text-gray-900 mt-3">
                  ₹{Number(quickViewItem.price || 0).toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                  {quickViewItem.description ||
                    "crafted from luxury grade materials with unmatched attention to detail. designed for elegant fitting and effortless style."}
                </p>
                {quickViewItem.sizes?.length > 0 && (
                  <div className="mt-5">
                    <p className="text-[10px] uppercase tracking-widest font-semibold mb-2">
                      Available sizes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickViewItem.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {quickViewItem.colors?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[10px] uppercase tracking-widest font-semibold mb-2">
                      Available colors
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickViewItem.colors.map((color) => (
                        <span
                          key={color}
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-4">
                  {Number(quickViewItem.stock || 0) > 0
                    ? `${quickViewItem.stock} items available`
                    : "out of stock"}
                </p>
              </div>
              <div className="space-y-3 mt-6">
                <button
                  onClick={() => handleAddToCart(quickViewItem)}
                  disabled={Number(quickViewItem.stock || 0) <= 0}
                  className={`w-full py-3.5 text-xs uppercase tracking-widest font-semibold rounded-xl transition ${Number(quickViewItem.stock || 0) <= 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"}`}
                >
                  {Number(quickViewItem.stock || 0) <= 0
                    ? "Out of Stock"
                    : "Add to Bag"}
                </button>
                <button
                  onClick={() => {
                    setQuickViewItem(null);
                    navigate(`/product/${quickViewItem._id}`);
                  }}
                  className="w-full py-2.5 text-xs text-gray-500 hover:text-black underline"
                >
                  View Product
                </button>
                <button
                  onClick={() => setQuickViewItem(null)}
                  className="w-full py-2.5 text-xs text-gray-500 hover:text-black underline"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
