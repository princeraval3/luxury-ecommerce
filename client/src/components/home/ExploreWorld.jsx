import React from 'react';
import image1  from '../assets/images/i1.png';
import image2  from '../assets/images/i2.png';
import image3  from '../assets/images/i3.png';
import image4  from '../assets/images/i4.png';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Women's Fashion",
    items: "712 Items",
    image: image1,
    path : '/women'
  },
  {
    title: "Men's Edit",
    items: "712 Items",
    image: image4,
    path : '/men'
  },
  {
    title: "Fine Jewellery",
    items: "712 Items",
    image: image2,
    path : '/jewellery'
  },
  {
    title: "Luxury Bags",
    items: "712 Items",
    image: image3,
    path : '/bagsAccessories'
  },
];

const ExploreWorld = () => {
  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

      
      <div className="mb-4 sm:mb-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-0.5">
          SHOP BY CATEGORY
        </p>
        <h2 className="text-xl sm:text-3xl font-serif text-gray-900 font-medium">
          Explore Our World
        </h2>
      </div>

      {/* grid-cols-2 for Mobile (2 cards per row) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {categories.map((cat, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden bg-black flex flex-col justify-between group cursor-pointer shadow-sm">
            {/* Top Image Part */}
              < Link 
              to={cat.path}>
            <div className="h-[180px] sm:h-[280px] overflow-hidden bg-gray-100">
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            {/* Bottom Content */}
            <div className="p-2.5 sm:p-4 bg-black text-white">
              <h3 className="text-xs sm:text-sm font-serif font-medium line-clamp-1">{cat.title}</h3>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">{cat.items}</p>
              <div className="mt-2 sm:mt-3 text-[#D4B07B] text-[10px] sm:text-xs font-medium flex items-center gap-0.5 sm:gap-1">
                Shop Now →
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreWorld;