import React from 'react';

const styles = [
  {
    title: "Casual",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
    span: "col-span-1 md:col-span-1"
  },
  {
    title: "Formal",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
    span: "col-span-1 md:col-span-2"
  },
  {
    title: "Party",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
    span: "col-span-1 md:col-span-2"
  },
  {
    title: "Gym",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    span: "col-span-1 md:col-span-1"
  }
];

const BrowseByStyle = () => {
  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      <div className="bg-[#f4e2c8] rounded-2xl sm:rounded-3xl p-4 sm:p-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-orange-400 uppercase tracking-tight mb-6 sm:mb-8">
          Browse By Dress Style
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5">
          {styles.map((style, idx) => (
            <div 
              key={idx} 
              className={`relative rounded-xl sm:rounded-2xl overflow-hidden h-[160px] sm:h-[240px] bg-white group cursor-pointer ${style.span}`}
            >
              <h3 className="absolute top-4 left-4 sm:top-6 sm:left-6 text-lg sm:text-2xl font-bold text-black z-10">
                {style.title}
              </h3>
              <img 
                src={style.image} 
                alt={style.title} 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByStyle;