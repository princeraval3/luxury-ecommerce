import React from 'react';

const ProductCard = ({ image, brand, title, price, originalPrice, discount, rating }) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden p-2 sm:p-3 border border-gray-100 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between h-full">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-gray-50">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
        {discount && (
          <span className="absolute top-1.5 left-1.5 bg-[#D4B07B] text-white text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider">
            {discount}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="pt-2 sm:pt-3 pb-0.5 flex-1 flex flex-col justify-between">
        <div>
          {brand && (
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-gray-400 font-medium mb-0.5 line-clamp-1">
              {brand}
            </p>
          )}
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1 mb-1">
            {title}
          </h3>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
            <span className="text-xs sm:text-base font-bold text-gray-900">₹{price}</span>
            {originalPrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">₹{originalPrice}</span>
            )}
            {rating && (
              <span className="ml-auto text-[10px] sm:text-[11px] text-gray-500 font-medium">
                ★ {rating}
              </span>
            )}
          </div>

          <button className="w-full py-1.5 sm:py-2.5 bg-black text-white text-[11px] sm:text-xs font-medium rounded-full hover:bg-gray-800 active:scale-95 transition duration-200">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;