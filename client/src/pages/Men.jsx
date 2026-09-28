import { useEffect, useMemo, useState } from "react";
import { FiHeart, FiSliders, FiX, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../services/productService";
import { addToCart } from "../services/cartService";

const priceOptions = [
  { label: "Under ₹5,000", min: 0, max: 4999 },
  { label: "₹5,000 - ₹15,000", min: 5000, max: 15000 },
  { label: "₹15,000 - ₹30,000", min: 15001, max: 30000 },
  { label: "Above ₹30,000", min: 30001, max: Infinity },
];

const ratingOptions = [
  { label: "★★★★★ 5.0", value: 5 },
  { label: "★★★★☆ 4+", value: 4 },
  { label: "★★★☆☆ 3+", value: 3 },
];

const MensCollection = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("Recommended");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [wishlist, setWishlist] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        if (data.success) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.log("failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // only men's products
  const menProducts = useMemo(() => {
    return products.filter((product) => {
      return product.category?.toLowerCase() === "men";
    });
  }, [products]);

  const categories = useMemo(() => {
    const allCategories = menProducts
      .map((product) => product.subCategory)
      .filter(Boolean);

    return [...new Set(allCategories)].sort();
  }, [menProducts]);

  const brands = useMemo(() => {
    const allBrands = menProducts
      .map((product) => product.brand)
      .filter(Boolean);

    return [...new Set(allBrands)].sort();
  }, [menProducts]);

  const sizes = useMemo(() => {
    const allSizes = menProducts.flatMap((product) => product.sizes || []);
    return [...new Set(allSizes)].sort();
  }, [menProducts]);

  const colors = useMemo(() => {
    const allColors = menProducts.flatMap((product) => product.colors || []);
    return [...new Set(allColors)].sort();
  }, [menProducts]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const togglePrice = (price) => {
    setSelectedPrices((prev) =>
      prev.includes(price.label)
        ? prev.filter((item) => item !== price.label)
        : [...prev, price.label]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((item) => item !== rating)
        : [...prev, rating]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const isPriceSelected = (price) => {
    return selectedPrices.includes(price.label);
  };

  const filteredProducts = useMemo(() => {
    let result = [...menProducts];

    if (selectedCategories.length > 0) {
      result = result.filter((product) =>
        selectedCategories.some(
          (category) =>
            product.subCategory?.toLowerCase() === category.toLowerCase()
        )
      );
    }

    if (selectedPrices.length > 0) {
      result = result.filter((product) =>
        selectedPrices.some((selectedPrice) => {
          const price = priceOptions.find(
            (item) => item.label === selectedPrice
          );

          if (!price) return false;

          return (
            product.price >= price.min &&
            product.price <= price.max
          );
        })
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.some(
          (brand) =>
            product.brand?.toLowerCase() === brand.toLowerCase()
        )
      );
    }

    if (selectedRatings.length > 0) {
      result = result.filter((product) => {
        const productRating = Number(product.rating || 0);

        return selectedRatings.some((rating) => productRating >= rating);
      });
    }

    if (selectedSizes.length > 0) {
      result = result.filter((product) => {
        const productSizes = product.sizes || [];

        return selectedSizes.some((size) =>
          productSizes.some(
            (productSize) =>
              productSize.toLowerCase() === size.toLowerCase()
          )
        );
      });
    }

    if (selectedColors.length > 0) {
      result = result.filter((product) => {
        const productColors = product.colors || [];

        return selectedColors.some((color) =>
          productColors.some(
            (productColor) =>
              productColor.toLowerCase() === color.toLowerCase()
          )
        );
      });
    }

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "Top Rated") {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) - Number(a.rating || 0)
      );
    }

    return result;
  }, [
    menProducts,
    selectedCategories,
    selectedPrices,
    selectedBrands,
    selectedRatings,
    selectedSizes,
    selectedColors,
    sortBy,
  ]);

  const handleAddToCart = async (product) => {
    try {
      if (product.stock <= 0) {
        alert("product is out of stock");
        return;
      }

      const data = await addToCart({
        productId: product._id,
        quantity: 1,
        size: product.sizes?.[0] || "",
        color: product.colors?.[0] || "",
      });

      if (data.success) {
        alert("product added to cart");
      }
    } catch (error) {
      console.log("add to cart error:", error);

      alert(
        error.response?.data?.message ||
          "please login to add product to cart"
      );
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const filterCount =
    selectedCategories.length +
    selectedPrices.length +
    selectedBrands.length +
    selectedRatings.length +
    selectedSizes.length +
    selectedColors.length;

  if (loading) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-sans text-gray-800 pb-20">
      {/* NAVBAR HEADER */}
      {/* <header className="bg-[#111111] text-white px-6 sm:px-12 py-5 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-serif tracking-[0.25em] font-light">
          LUXE
        </h1>
        <div className="text-xs font-medium tracking-wider">Bag (3)</div>
      </header> */}

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {/* BREADCRUMB */}
        <nav className="text-[11px] text-gray-500 flex items-center gap-1 mb-4">
          <span>Home</span> <FiChevronRight className="text-[10px]" />
          <span>Men</span> <FiChevronRight className="text-[10px]" />
          <span className="text-gray-900 font-medium">All Collection</span>
        </nav>

        {/* TITLE AND COUNT */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-gray-900">
            Men's Collection
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-light">540 products</p>
        </div>

        {/* TOP SORTING BAR */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200/80 mb-8">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 text-xs font-medium text-gray-800 bg-white px-4 py-2 rounded-full border border-gray-200"
          >
            <FiSliders /> Filters
          </button>

          <div className="hidden lg:flex items-center gap-6 ml-auto text-xs">
            <span className="text-gray-400 font-light">Sort by:</span>
            {["Recommended", "Price: Low to High", "Price: High to Low", "Top Rated"].map(
              (option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`transition ${
                    sortBy === option
                      ? "text-gray-900 font-semibold underline underline-offset-4"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>

        {/* CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDEBAR FILTERS (3 COLUMNS) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 text-xs text-gray-700 pr-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-900">
                FILTERS
              </h2>

              {filterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-[10px] text-gray-500 hover:text-black underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* CATEGORY */}
            <div className="space-y-2 pb-5 border-b border-gray-200/80">
              <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                CATEGORY
              </p>

              {categories.length === 0 ? (
                <p className="text-gray-400">no categories available</p>
              ) : (
                categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-3.5 h-3.5 accent-black rounded-sm cursor-pointer"
                    />
                    <span>{category}</span>
                  </label>
                ))
              )}
            </div>

            {/* PRICE RANGE */}
            <div className="space-y-2 pb-5 border-b border-gray-200/80">
              <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                PRICE RANGE
              </p>

              {priceOptions.map((price) => (
                <label
                  key={price.label}
                  className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black"
                >
                  <input
                    type="checkbox"
                    checked={isPriceSelected(price)}
                    onChange={() => togglePrice(price)}
                    className="w-3.5 h-3.5 accent-black rounded-sm cursor-pointer"
                  />
                  <span>{price.label}</span>
                </label>
              ))}
            </div>

            {/* BRAND */}
            <div className="space-y-2 pb-5 border-b border-gray-200/80">
              <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                BRAND
              </p>

              {brands.length === 0 ? (
                <p className="text-gray-400">no brands available</p>
              ) : (
                brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-3.5 h-3.5 accent-black rounded-sm cursor-pointer"
                    />
                    <span>{brand}</span>
                  </label>
                ))
              )}
            </div>

            {/* RATINGS */}
            <div className="space-y-2 pb-5 border-b border-gray-200/80">
              <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                RATINGS
              </p>

              {ratingOptions.map((rating) => (
                <label
                  key={rating.value}
                  className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black"
                >
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating.value)}
                    onChange={() => toggleRating(rating.value)}
                    className="w-3.5 h-3.5 accent-black rounded-sm cursor-pointer"
                  />
                  <span>{rating.label}</span>
                </label>
              ))}
            </div>

            {/* SIZE */}
            <div className="space-y-2 pb-5 border-b border-gray-200/80">
              <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                SIZE
              </p>

              {sizes.length === 0 ? (
                <p className="text-gray-400">no sizes available</p>
              ) : (
                sizes.map((size) => (
                  <label
                    key={size}
                    className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black"
                  >
                    <input
                      type="checkbox"
                      checked={selectedSizes.includes(size)}
                      onChange={() => toggleSize(size)}
                      className="w-3.5 h-3.5 accent-black rounded-sm cursor-pointer"
                    />
                    <span>{size}</span>
                  </label>
                ))
              )}
            </div>

            {/* COLOR */}
            <div className="space-y-2 pb-5">
              <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                COLOR
              </p>

              {colors.length === 0 ? (
                <p className="text-gray-400">no colors available</p>
              ) : (
                colors.map((color) => (
                  <label
                    key={color}
                    className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black"
                  >
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(color)}
                      onChange={() => toggleColor(color)}
                      className="w-3.5 h-3.5 accent-black rounded-sm cursor-pointer"
                    />
                    <span>{color}</span>
                  </label>
                ))
              )}
            </div>
          </aside>

          {/* RIGHT PRODUCT GRID (9 COLUMNS) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                <h2 className="text-lg font-serif text-gray-900">
                  No products found
                </h2>
                <p className="text-xs text-gray-500 mt-2 mb-5">
                  Try changing or clearing your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-black text-white text-xs rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                {filteredProducts.map((product) => {
                  const image =
                    product.images?.[0] ||
                    "https://via.placeholder.com/600x800";

                  const rating = Number(product.rating || 0);

                  return (
                    <div
                      key={product._id}
                      className="bg-white rounded-xl overflow-hidden border border-gray-200/70 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group"
                    >
                      <div
                        className="relative aspect-3/4 bg-gray-100 overflow-hidden cursor-pointer"
                        onClick={() => handleProductClick(product._id)}
                      >
                        <img
                          src={image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />

                        {product.isFeatured && (
                          <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#C5A059] text-white">
                            Featured
                          </span>
                        )}

                        {product.stock <= 0 && (
                          <span className="absolute bottom-3 left-3 text-[9px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-black text-white">
                            Out of stock
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product._id);
                          }}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition p-1.5"
                        >
                          <FiHeart
                            className={`text-sm ${
                              wishlist.includes(product._id)
                                ? "fill-red-500 text-red-500"
                                : ""
                            }`}
                          />
                        </button>
                      </div>

                      <div className="p-4 flex flex-col justify-between flex-1">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-1">
                            {product.brand || "LUXE"}
                          </p>

                          <h3
                            onClick={() =>
                              handleProductClick(product._id)
                            }
                            className="text-xs sm:text-sm font-serif font-medium text-gray-900 group-hover:text-[#C5A059] transition cursor-pointer"
                          >
                            {product.name}
                          </h3>

                          <div className="flex items-center text-[10px] text-amber-500 gap-1 mt-1">
                            <span>★★★★★</span>
                            <span className="text-gray-500 font-medium">
                              {rating > 0 ? rating : "no rating"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100 space-y-3">
                          <p className="text-xs sm:text-sm font-bold text-gray-900">
                            ₹{Number(product.price || 0).toLocaleString("en-IN")}
                          </p>

                          <button
                            disabled={product.stock <= 0}
                            onClick={() => handleAddToCart(product)}
                            className="w-full py-2.5 bg-[#111111] text-white text-[11px] font-medium tracking-wider rounded hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            {product.stock <= 0
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

      </div>

      {/* MOBILE FILTERS OVERLAY */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="relative w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col justify-between z-10 shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                    FILTERS
                  </h2>

                  {filterCount > 0 && (
                    <span className="bg-black text-white rounded-full px-2 py-0.5 text-[9px]">
                      {filterCount}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <div className="space-y-6 text-xs text-gray-700">
                {/* CATEGORY */}
                <div>
                  <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                    CATEGORY
                  </p>

                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-3.5 h-3.5 accent-black"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>

                {/* PRICE */}
                <div>
                  <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                    PRICE RANGE
                  </p>

                  {priceOptions.map((price) => (
                    <label
                      key={price.label}
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isPriceSelected(price)}
                        onChange={() => togglePrice(price)}
                        className="w-3.5 h-3.5 accent-black"
                      />
                      <span>{price.label}</span>
                    </label>
                  ))}
                </div>

                {/* BRAND */}
                <div>
                  <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                    BRAND
                  </p>

                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-3.5 h-3.5 accent-black"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>

                {/* RATING */}
                <div>
                  <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                    RATINGS
                  </p>

                  {ratingOptions.map((rating) => (
                    <label
                      key={rating.value}
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating.value)}
                        onChange={() => toggleRating(rating.value)}
                        className="w-3.5 h-3.5 accent-black"
                      />
                      <span>{rating.label}</span>
                    </label>
                  ))}
                </div>

                {/* SIZE */}
                <div>
                  <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                    SIZE
                  </p>

                  {sizes.map((size) => (
                    <label
                      key={size}
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSizes.includes(size)}
                        onChange={() => toggleSize(size)}
                        className="w-3.5 h-3.5 accent-black"
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>

                {/* COLOR */}
                <div>
                  <p className="font-semibold uppercase tracking-wider text-[10px] text-gray-900 mb-2">
                    COLOR
                  </p>

                  {colors.map((color) => (
                    <label
                      key={color}
                      className="flex items-center gap-2 mb-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleColor(color)}
                        className="w-3.5 h-3.5 accent-black"
                      />
                      <span>{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={clearFilters}
                className="w-full py-3 border border-gray-300 text-gray-800 text-xs font-semibold uppercase tracking-wider rounded-lg"
              >
                Clear Filters
              </button>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
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

export default MensCollection;
