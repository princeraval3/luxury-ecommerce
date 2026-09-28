import React from 'react';

const subcategories = [
  {
    title: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Tops & Blouses",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Trousers",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Jackets & Coats",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Knitwear",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Skirts",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Jeans",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600",
  },
  {
    title: "Loungewear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600",
  },
];

const Women = () => {
  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <p className="text-xs text-gray-500">
          <span className="hover:underline cursor-pointer">Home</span> / <span className="text-gray-800 font-medium">Women</span>
        </p>
      </div>

      {/* Hero Section Banner */}
      <section className="bg-[#121212] text-white py-12 sm:py-16 text-center px-4 mb-10">
        <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C5A059] font-semibold mb-2">
          WOMEN'S FASHION
        </p>
        <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-wide mb-3">
          Discover Your Style
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 font-light tracking-wide">
          1,247 curated pieces for the modern woman
        </p>
      </section>

      {/* Main Subcategories Container */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-serif text-gray-900 font-medium mb-6">
          Browse Subcategories
        </h2>

        {/* 2 per row on Mobile, 4 per row on Laptop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {subcategories.map((item, idx) => (
            <div 
              key={idx} 
              className="relative h-[280px] sm:h-[380px] rounded-xl overflow-hidden group cursor-pointer shadow-sm bg-gray-200"
            >
              {/* Category Background Image */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              
              {/* Subtle Gradient Overlay for Text Visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Bottom Card Title & Link */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                <h3 className="text-base sm:text-xl font-serif font-medium leading-tight">
                  {item.title}
                </h3>
                <div className="text-[#D4B07B] text-xs font-medium flex items-center gap-1 mt-1 group-hover:translate-x-1 transition duration-200">
                  Shop →
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Women;