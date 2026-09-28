import React from 'react';
import ProductCard from './ProductCard';
import image5 from '../assets/images/i5.jpg';
import image6 from '../assets/images/i6.jpg';
import image7 from '../assets/images/i7.png';
import image8 from '../assets/images/i8.png';
import { Link } from 'react-router-dom';

const deals = [
  {
    id: 1,
    brand: "HUGO BOSS",
    title: "Cashmere Scarf",
    price: "8,499",
    originalPrice: "14,999",
    discount: "43% OFF",
    image: image5,
    path : "/404"
  },
  {
    id: 2,
    brand: "TED BAKER",
    title: "Leather Loafers",
    price: "12,999",
    originalPrice: "19,999",
    discount: "35% OFF",
    image: image6,
    path : "/404"
  },
  {
    id: 3,
    brand: "FOSSIL",
    title: "Gold Watch",
    price: "21,999",
    originalPrice: "32,999",
    discount: "33% OFF",
    image: image7,
    path : "/404"
  },
  {
    id: 4,
    brand: "VERO MODA",
    title: "Silk Dress",
    price: "6,999",
    originalPrice: "12,499",
    discount: "44% OFF",
    image: image8,
    path : "/404"
  }
];

const TodaysDeals = () => {
  return (
    <section className="py-6 sm:py-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-4 sm:mb-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-0.5">
            LIMITED TIME
          </p>
          <h2 className="text-xl sm:text-3xl font-serif text-gray-900 font-medium">
            Today's Deals
          </h2>
        </div>
        
        {/* Live Timer */}
        <div className="text-[11px] sm:text-xs font-medium text-[#C5A059]">
          Ends In <span className="font-mono font-bold text-gray-800 ml-0.5 sm:ml-1">02h : 34m</span>
        </div>
      </div>

      {/* 2 items per row in Mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {deals.map(item => (
          <Link 
          to={item.path}>
          <ProductCard key={item.id} {...item} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TodaysDeals;