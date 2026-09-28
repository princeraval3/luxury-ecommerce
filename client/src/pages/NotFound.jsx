import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-5xl text-center">

        {/* 404 */}
        <div className="relative mb-6 sm:mb-8">
          <h1 className="text-[120px] sm:text-[180px] md:text-[220px] lg:text-[260px] leading-none font-serif font-bold text-[#e8e4df] select-none">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl sm:text-4xl md:text-5xl font-serif text-gray-900 tracking-[0.15em]">
              OOPS!
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            page not found
          </h2>

          <p className="text-sm sm:text-base text-gray-500 leading-7 mb-8 px-4">
            the page you're looking for doesn't exist or may have been moved.
            let's get you back to something beautiful.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2
              px-7 py-3.5 bg-black text-white text-sm tracking-wide
              hover:bg-gray-800 transition-all duration-300"
            >
              <Home size={17} />
              back to home
            </button>

            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2
              px-7 py-3.5 border border-gray-300 text-gray-800 text-sm
              tracking-wide hover:bg-gray-100 transition-all duration-300"
            >
              <ArrowLeft size={17} />
              go back
            </button>
          </div>
        </div>

        {/* Bottom text */}
        <div className="mt-12 sm:mt-16">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-gray-400">
            luxe collection
          </p>
        </div>

      </div>
    </div>
  );
};

export default NotFound;