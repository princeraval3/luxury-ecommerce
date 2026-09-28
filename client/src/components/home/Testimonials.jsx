import React, { useRef } from 'react';

const testimonialsData = [
  {
    id: 1,
    name: "Sarah M.",
    verified: true,
    rating: 5,
    review: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
  },
  {
    id: 2,
    name: "Alex K.",
    verified: true,
    rating: 5,
    review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
  },
  {
    id: 3,
    name: "James L.",
    verified: true,
    rating: 5,
    review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
  },
  {
    id: 4,
    name: "Mooen K.",
    verified: true,
    rating: 5,
    review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
  }
];

const Testimonials = () => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Header & Arrow Controls */}
      <div className="flex justify-between items-end mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-black uppercase tracking-tight">
          OUR HAPPY CUSTOMERS
        </h2>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleScroll('left')} 
            className="p-2 sm:p-2.5 rounded-full hover:bg-gray-100 transition active:scale-95"
            aria-label="Previous testimonials"
          >
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <button 
            onClick={() => handleScroll('right')} 
            className="p-2 sm:p-2.5 rounded-full hover:bg-gray-100 transition active:scale-95"
            aria-label="Next testimonials"
          >
            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Testimonials Horizontal Slider Grid */}
      <div 
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {testimonialsData.map((item) => (
          <div 
            key={item.id} 
            className="min-w-[280px] sm:min-w-[360px] max-w-[360px] bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between snap-start shadow-sm flex-shrink-0"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-base sm:text-lg">★</span>
                ))}
              </div>

              {/* Name & Verified Badge */}
              <div className="flex items-center gap-1.5 mb-2">
                <h3 className="text-base sm:text-lg font-bold text-black">{item.name}</h3>
                {item.verified && (
                  <span className="bg-emerald-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </span>
                )}
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                "{item.review}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;