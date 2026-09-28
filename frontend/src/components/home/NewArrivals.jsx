import React from 'react';
import ProductCard from './ProductCard';

const newArrivalsData = [
  {
    id: 201,
    brand: "LUXE ESSENTIALS",
    title: "T-shirt with Tape Details",
    price: "120",
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 202,
    brand: "DENIM CO",
    title: "Skinny Fit Jeans",
    price: "240",
    originalPrice: "260",
    discount: "-20%",
    rating: "3.5",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 203,
    brand: "URBAN STYLE",
    title: "Checkered Shirt",
    price: "180",
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 204,
    brand: "SPORTX",
    title: "Sleeve Striped T-shirt",
    price: "130",
    originalPrice: "160",
    discount: "-30%",
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600"
  }
];

const NewArrivals = () => {
  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 border-t border-gray-100">
      <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-orange-200 uppercase tracking-tight mb-6 sm:mb-8">
        New Arrivals
      </h2>

      {/* 2 per row on Mobile, 4 on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {newArrivalsData.map(item => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>

      <div className="text-center mt-6 sm:mt-8">
        <button className="px-10 py-2.5 sm:py-3 border border-gray-300 text-xs sm:text-sm font-medium rounded-full hover:bg-black hover:text-white transition duration-200">
          View All
        </button>
      </div>
    </section>
  );
};

export default NewArrivals;