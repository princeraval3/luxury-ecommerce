import React, { useState } from "react";
import { 
  FiHeart, 
  FiChevronRight, 
  FiEye, 
  FiX, 
  FiStar 
} from "react-icons/fi";

const jewelleryProducts = [
  {
    id: 1,
    category: "Earrings",
    brand: "CHANEL",
    name: "CC Crystal Drop Earrings",
    price: 48999,
    originalPrice: 55000,
    rating: 5.0,
    badge: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    category: "Necklaces",
    brand: "TIFFANY & CO.",
    name: "Heart Tag Pendant Necklace",
    price: 65000,
    originalPrice: 72000,
    rating: 4.9,
    badge: "ICONIC",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    category: "Rings",
    brand: "CARTIER",
    name: "Love Ring 18K Gold",
    price: 115000,
    originalPrice: 128000,
    rating: 5.0,
    badge: "LUXURY",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    category: "Bracelets",
    brand: "BVLGARI",
    name: "Serpenti Viper Bracelet",
    price: 185000,
    originalPrice: 199000,
    rating: 4.9,
    badge: "PREMIUM",
    image: "https://images.unsplash.com/photo-1611591475155-4282faa7c2e7?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    category: "Necklaces",
    brand: "VAN CLEEF",
    name: "Vintage Alhambra Pendant",
    price: 240000,
    originalPrice: 260000,
    rating: 5.0,
    badge: "RARE",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 6,
    category: "Earrings",
    brand: "DIOR",
    name: "Tribales Pearl Earrings",
    price: 39999,
    originalPrice: 45000,
    rating: 4.8,
    badge: "TRENDING",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=600",
  },
];

const Jewellery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = ["All", "Necklaces", "Earrings", "Rings", "Bracelets"];

  const filteredProducts =
    selectedCategory === "All"
      ? jewelleryProducts
      : jewelleryProducts.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-sans text-gray-800 pb-24">
      {/* NAVBAR HEADER */}
      {/* <header className="bg-[#111111] text-white px-4 sm:px-12 py-4 sm:py-5 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <h1 className="text-lg sm:text-2xl font-serif tracking-[0.25em] font-light cursor-pointer">
          LUXE
        </h1>
        <div className="text-[11px] sm:text-xs font-medium tracking-wider bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
          Bag (3)
        </div>
      </header> */}

      {/* HERO BANNER */}
      <div className="relative bg-[#14110F] text-white py-12 sm:py-20 px-4 text-center overflow-hidden border-b border-[#C5A059]/30">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-3xl mx-auto relative z-10 space-y-2 sm:space-y-3">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#C5A059] font-bold block">
            — HIGH JEWELLERY Atelier —
          </span>
          <h1 className="text-2xl sm:text-5xl font-serif font-normal tracking-wide text-amber-50">
            Fine Jewellery
          </h1>
          <p className="text-[11px] sm:text-sm text-gray-400 font-light max-w-lg mx-auto pt-1 leading-relaxed">
            Adorn yourself with timeless gold, sparkling diamond creations, and exquisite artisan craftsmanship.
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 pt-6 sm:pt-8">
        {/* BREADCRUMB */}
        <nav className="text-[10px] sm:text-[11px] text-gray-500 flex items-center gap-1 mb-6">
          <span className="hover:text-black cursor-pointer">Home</span> 
          <FiChevronRight className="text-[10px]" />
          <span className="text-gray-900 font-semibold">Jewellery</span>
        </nav>

        {/* CATEGORY TABS & FILTER BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-200/80 pb-3 sm:pb-4 mb-6 sm:mb-10 gap-3">
          {/* Categories */}
          <div className="flex gap-4 sm:gap-8 text-[11px] sm:text-xs font-semibold uppercase tracking-wider overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`transition-all whitespace-nowrap pb-1 relative ${
                  selectedCategory === cat
                    ? "text-black font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting & Stats */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-[11px] sm:text-xs">
            <div className="text-gray-400 font-light">
              <span className="text-black font-semibold">{filteredProducts.length}</span> Pieces
            </div>

            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 py-1 px-2 sm:px-3 rounded-lg focus:outline-none"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* PRODUCT GRID - MOBILE 2 COLUMNS (grid-cols-2) */}
        <main>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl transition duration-300 flex flex-col justify-between group"
              >
                {/* Image Container */}
                <div className="relative aspect-square sm:aspect-3/4 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-2 left-2 sm:top-4 sm:left-4 text-[8px] sm:text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#111111] text-white shadow-md">
                      {product.badge}
                    </span>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex flex-col gap-1.5 sm:gap-2">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="bg-white/90 backdrop-blur-md p-1.5 sm:p-2 rounded-full text-gray-600 hover:text-red-500 transition shadow-sm"
                      title="Save to Wishlist"
                    >
                      <FiHeart
                        className={`text-xs sm:text-sm ${
                          wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </button>
                    
                    <button
                      onClick={() => setQuickViewItem(product)}
                      className="bg-white/90 backdrop-blur-md p-1.5 sm:p-2 rounded-full text-gray-600 hover:text-black transition shadow-sm hidden sm:block opacity-0 group-hover:opacity-100 duration-200"
                      title="Quick Preview"
                    >
                      <FiEye className="text-sm" />
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-3 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold truncate">
                        {product.brand}
                      </p>
                      <div className="flex items-center text-[10px] sm:text-[11px] text-amber-500 gap-0.5">
                        <FiStar className="fill-amber-500 text-amber-500 text-[9px]" />
                        <span className="text-gray-700 font-semibold">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-xs sm:text-base font-serif font-medium text-gray-900 group-hover:text-[#C5A059] transition line-clamp-1">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 sm:mt-5 pt-2 sm:pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-xs sm:text-base font-bold text-gray-900">
                        ₹{product.price.toLocaleString("en-IN")}
                      </p>
                      {product.originalPrice && (
                        <p className="text-[9px] sm:text-[11px] text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </p>
                      )}
                    </div>

                    <button 
                      onClick={() => setQuickViewItem(product)}
                      className="w-full sm:w-auto px-3 py-2 sm:px-5 sm:py-3 bg-[#111111] text-white text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold rounded-lg sm:rounded-xl hover:bg-[#C5A059] hover:text-black transition duration-200 text-center"
                    >
                      Add To Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* QUICK VIEW MODAL */}
      {quickViewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setQuickViewItem(null)}
          />
          <div className="relative bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-8 overflow-hidden z-10 shadow-2xl grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <button
              onClick={() => setQuickViewItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-full bg-gray-100 z-10"
            >
              <FiX className="text-lg" />
            </button>

            <div className="aspect-square sm:aspect-3/4 bg-gray-100 rounded-xl overflow-hidden">
              <img 
                src={quickViewItem.image} 
                alt={quickViewItem.name} 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="flex flex-col justify-between py-1 sm:py-2">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                  {quickViewItem.brand}
                </span>
                <h2 className="text-lg sm:text-xl font-serif font-normal text-gray-900 mt-1">
                  {quickViewItem.name}
                </h2>
                <p className="text-base sm:text-lg font-bold text-gray-900 mt-2 sm:mt-3">
                  ₹{quickViewItem.price.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-gray-500 mt-3 sm:mt-4 leading-relaxed">
                  Handcrafted with pure precious metals and high-clarity gemstones for an everlasting brilliance.
                </p>
              </div>

              <div className="space-y-2 sm:space-y-3 mt-4 sm:mt-6">
                <button className="w-full py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold rounded-xl hover:bg-gray-800 transition">
                  Add to Bag
                </button>
                <button 
                  onClick={() => setQuickViewItem(null)}
                  className="w-full py-1.5 text-xs text-gray-500 hover:text-black underline"
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

export default Jewellery;