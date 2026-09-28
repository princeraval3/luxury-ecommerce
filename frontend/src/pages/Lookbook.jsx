import React, { useState } from "react";
import { 
  FiHeart, 
  FiChevronRight, 
  FiEye, 
  FiX, 
  FiShoppingBag,
  FiPlus
} from "react-icons/fi";

const lookbookData = [
  {
    id: 1,
    title: "The Autumn Haute Editorial",
    season: "FALL / WINTER COLLECTION",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200",
    tags: ["All", "Haute Couture", "Jewellery"],
    products: [
      {
        id: 101,
        name: "Silk Tailored Blazer",
        brand: "BALMAIN",
        price: 85000,
        x: "35%", // Pin Position X
        y: "40%", // Pin Position Y
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400",
      },
      {
        id: 102,
        name: "CC Diamond Drop Earrings",
        brand: "CHANEL",
        price: 48999,
        x: "52%",
        y: "22%",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400",
      },
    ],
  },
  {
    id: 2,
    title: "Minimalist Elegance",
    season: "RESORT COLLECTION",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200",
    tags: ["All", "Haute Couture", "Beauty"],
    products: [
      {
        id: 201,
        name: "Pleated Silk Evening Dress",
        brand: "DIOR",
        price: 145000,
        x: "48%",
        y: "55%",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=400",
      },
      {
        id: 202,
        name: "Libre Eau De Parfum",
        brand: "YSL BEAUTY",
        price: 13500,
        x: "65%",
        y: "80%",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
      },
    ],
  },
];

const individualLookItems = [
  {
    id: 301,
    brand: "TIFFANY & CO.",
    name: "Heart Tag Pendant",
    price: 65000,
    badge: "FEATURED",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 302,
    brand: "VERSACE HOME",
    name: "Porcelain Gold Vase",
    price: 38500,
    badge: "MAISON",
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 303,
    brand: "LA MER",
    name: "Crème Moisturizer",
    price: 29500,
    badge: "BEAUTY",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 304,
    brand: "CARTIER",
    name: "Love Ring 18K Gold",
    price: 115000,
    badge: "JEWELLERY",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
  },
];

const Lookbook = () => {
  const [activeTag, setActiveTag] = useState("All");
  const [activePin, setActivePin] = useState(null);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = ["All", "Haute Couture", "Jewellery", "Beauty"];

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-sans text-gray-800 pb-24">
      {/* NAVBAR HEADER */}
      {/* <header className="bg-[#111111] text-white px-4 sm:px-12 py-4 sm:py-5 flex justify-between items-center sticky top-0 z-40 shadow-md">
        <h1 className="text-lg sm:text-2xl font-serif tracking-[0.25em] font-light cursor-pointer">
          LUXE
        </h1>
        <div className="text-[11px] sm:text-xs font-medium tracking-wider bg-white/10 px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
          <FiShoppingBag className="text-xs" /> Bag (3)
        </div>
      </header> */}

      {/* HERO BANNER */}
      <div className="relative bg-[#111111] text-white py-14 sm:py-24 px-4 text-center overflow-hidden border-b border-[#C5A059]/30">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-3xl mx-auto relative z-10 space-y-3">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-bold block animate-pulse">
            — EDITORIAL VISION —
          </span>
          <h1 className="text-3xl sm:text-6xl font-serif font-normal tracking-wider text-amber-50">
            The Visual Lookbook
          </h1>
          <p className="text-[11px] sm:text-sm text-gray-400 font-light max-w-lg mx-auto pt-1 leading-relaxed">
            Explore curated styling stories, tap interactive pins to discover high fashion pieces directly.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 pt-6 sm:pt-8">
        {/* BREADCRUMB */}
        <nav className="text-[10px] sm:text-[11px] text-gray-500 flex items-center gap-1 mb-6">
          <span className="hover:text-black cursor-pointer">Home</span> 
          <FiChevronRight className="text-[10px]" />
          <span className="text-gray-900 font-semibold">Lookbook</span>
        </nav>

        {/* CATEGORY TABS */}
        <div className="flex justify-center border-b border-gray-200/80 pb-3 mb-8 sm:mb-12">
          <div className="flex gap-4 sm:gap-10 text-[11px] sm:text-xs font-semibold uppercase tracking-wider overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTag(cat)}
                className={`transition-all whitespace-nowrap pb-1 relative ${
                  activeTag === cat
                    ? "text-black font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* INTERACTIVE EDITORIAL LOOKS */}
        <section className="space-y-12 sm:space-y-20 mb-16 sm:mb-24">
          {lookbookData.map((look) => (
            <div 
              key={look.id} 
              className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 group"
            >
              {/* IMAGE WITH HOTSPOT PINS */}
              <div className="lg:col-span-8 relative aspect-4/5 sm:aspect-16/10 lg:aspect-auto overflow-hidden bg-gray-100">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-1000 ease-out"
                />

                {/* HOTSPOT PINS WITH PULSE ANIMATION */}
                {look.products.map((prod) => (
                  <div
                    key={prod.id}
                    style={{ top: prod.y, left: prod.x }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => setActivePin(activePin === prod.id ? null : prod.id)}
                      className="relative flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white hover:scale-110 transition duration-300"
                    >
                      {/* Pulse Ring */}
                      <span className="absolute inset-0 rounded-full bg-[#C5A059] opacity-40 animate-ping"></span>
                      <FiPlus className={`text-xs sm:text-sm text-black transition duration-300 ${activePin === prod.id ? "rotate-45" : ""}`} />
                    </button>

                    {/* PIN POPUP CARD */}
                    {activePin === prod.id && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 sm:w-56 bg-white rounded-xl shadow-2xl p-3 border border-gray-100 z-30 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex gap-2.5 items-center">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-12 object-cover rounded-lg border"
                          />
                          <div className="overflow-hidden">
                            <span className="text-[8px] uppercase tracking-wider text-[#C5A059] font-bold block truncate">
                              {prod.brand}
                            </span>
                            <p className="text-xs font-serif font-medium text-gray-900 truncate">
                              {prod.name}
                            </p>
                            <p className="text-xs font-bold text-gray-900 mt-0.5">
                              ₹{prod.price.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        <button 
                          onClick={() => setQuickViewItem(prod)}
                          className="w-full mt-2.5 py-1.5 bg-black text-white text-[9px] uppercase tracking-widest font-semibold rounded-lg hover:bg-[#C5A059] hover:text-black transition"
                        >
                          Quick View
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* EDITORIAL CONTENT INFO */}
              <div className="lg:col-span-4 p-6 sm:p-10 flex flex-col justify-between bg-white">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-2">
                    {look.season}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-gray-900 mb-3 sm:mb-4">
                    {look.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed mb-6">
                    A masterpiece of modern silhouette and luxurious materials, curated to express effortless elegance.
                  </p>

                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">
                      Featured in this look
                    </h4>
                    
                    <div className="space-y-3">
                      {look.products.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition cursor-pointer"
                          onClick={() => setQuickViewItem(item)}
                        >
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg" />
                            <div>
                              <p className="text-xs font-semibold text-gray-900">{item.name}</p>
                              <p className="text-[10px] text-gray-400">{item.brand}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-gray-900">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6">
                  <button className="w-full py-3.5 bg-black text-white text-[10px] uppercase tracking-widest font-semibold rounded-xl hover:bg-[#C5A059] hover:text-black transition">
                    Shop Full Editorial Look
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* LOOKBOOK GALLERY - MOBILE 2 COLUMNS (grid-cols-2) */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-bold block">
                — CURATED GALLERY —
              </span>
              <h3 className="text-xl sm:text-3xl font-serif font-normal text-gray-900">
                Individual Statement Pieces
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {individualLookItems.map((product) => (
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
                <div className="p-3 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold truncate">
                      {product.brand}
                    </p>
                    <h3 className="text-xs sm:text-base font-serif font-medium text-gray-900 group-hover:text-[#C5A059] transition line-clamp-1 mt-0.5">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-xs sm:text-base font-bold text-gray-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    <button 
                      onClick={() => setQuickViewItem(product)}
                      className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2.5 bg-[#111111] text-white text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold rounded-lg sm:rounded-xl hover:bg-[#C5A059] hover:text-black transition duration-200 text-center"
                    >
                      View Piece
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
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
                  High-fashion editorial showcase piece curated specifically for the modern luxury wardrobe collection.
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

export default Lookbook;