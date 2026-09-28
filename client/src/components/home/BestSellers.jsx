import React from 'react';
import ProductCard from './ProductCard';
import image5 from '../assets/images/i5.jpg';
import image6 from '../assets/images/i6.jpg';
import image7 from '../assets/images/i7.png';
import image8 from '../assets/images/i8.png';

const bestSellers = [
  {
    id: 101,
    brand: "COACH",
    title: "Tote in Pebbled Leather",
    price: "24,999",
    rating: "4.9",
    image: image5,
  },
  {
    id: 102,
    brand: "ZARA PREMIUM",
    title: "Boston Rollneck",
    price: "8,999",
    rating: "4.8",
    image: image6,
  },
  {
    id: 103,
    brand: "CLARKS",
    title: "Chelsea Boots",
    price: "9,999",
    rating: "4.7",
    image: image7,
  },
  {
    id: 104,
    brand: "SWAROVSKI",
    title: "Pearl Drop Earrings",
    price: "2,899",
    rating: "4.9",
    image: image8,
  }
];

const BestSellers = () => {
  return (
    <section className="py-6 sm:py-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="mb-4 sm:mb-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-0.5">
          CONSISTENTLY LOVED
        </p>
        <h2 className="text-xl sm:text-3xl font-serif text-gray-900 font-medium">
          Best Sellers
        </h2>
      </div>

      {/* 2 items per row in Mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {bestSellers.map(item => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default BestSellers;