import React from 'react';
import banner from '../assets/images/Rectangle.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Banner Container */}
      <div 
           className="relative min-h-[460px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px] w-full bg-cover bg-center bg-no-repeat flex items-center"        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        {/* Floating Content Box */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 sm:py-16">
          <div className="max-w-xs sm:max-w-md lg:max-w-xl space-y-4 sm:space-y-5">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#C5A059] font-semibold">
              THE NEW SEASON
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-gray-900 leading-[1.15]">
              Where Luxury <br /> Meets You.
            </h1>
            <p className="text-xs sm:text-sm text-gray-700 max-w-xs sm:max-w-sm leading-relaxed">
              Curated collections from the world's finest designers. Delivered to your door.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
              to={'/shop'}>
              <button className="px-6 py-3 bg-[#D4B07B] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#b89562] transition shadow-sm text-center">
                Shop Collection
              </button>
              </Link>
              <Link
              to={'/lookbook'}>
              <button className="px-6 py-3 bg-black text-white text-xs uppercase tracking-wider font-medium hover:bg-gray-800 transition shadow-sm text-center">
                View Lookbook
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker Bar / Marquee - Overflow Proof */}
      <div className="w-full bg-[#D4B07B] py-2.5 sm:py-3 text-white text-[10px] sm:text-xs font-medium tracking-widest uppercase overflow-hidden">
  <div className="animate-marquee-ltr space-x-6 sm:space-x-12">
    <span>Free Express Shipping Worldwide</span>
    <span>•</span>
    <span>New Arrivals Weekly</span>
    <span>•</span>
    <span>Authentic Luxury Guarantee</span>
    <span>•</span>
    <span>Free Express Shipping Worldwide</span>
    <span>•</span>
    <span>New Arrivals Weekly</span>
    <span>•</span>
    <span>Authentic Luxury Guarantee</span>
    <span>•</span>
  </div>
</div>
    </section>
  );
};

export default Hero;  