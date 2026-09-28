import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user } = useAuth();
  console.log(user);
  console.log(user?.role);
  

  const topCategories = [
    { name: "All", path: "/shop" },
    { name: "Clothing", path: "/clothing" },
    { name: "Footwear", path: "/footwear" },
    { name: "Bags & Accessories", path: "/bagsAccessories" },
    { name: "Watches", path: "/watches" },
    { name: "Jewellery", path: "/jewellery" },
    { name: "Beauty", path: "/beauty" },
    { name: "Home & Living", path: "/homeLiving" },
  ];

  const mainLinks = [
    { name: "Women", path: "/women" },
    { name: "Men", path: "/men" },
    { name: "New In", path: "/new-arrivals" },
    { name: "Collections", path: "/shop" },
    { name: "Sale", path: "/sale" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top Black Header Bar */}
      <div className="bg-black text-white text-xs px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-serif tracking-[0.2em] font-bold text-orange-200 uppercase"
          >
            LUXE
          </Link>

          {/* Center Main Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6 text-[11px] uppercase tracking-widest text-white">
            {mainLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `hover:text-orange-200 transition ${isActive ? "text-white font-semibold" : ""}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Menu */}
          <div className="flex items-center space-x-4 text-[11px] tracking-wider">
            <button className="hidden sm:inline-block hover:text-orange-200">
              Search
            </button>
            <Link to="/wishlist" className="hover:text-orange-200">
              Wishlist
            </Link>
            <Link
              to="/cart"
              className="hover:text-orange-200 flex items-center gap-1"
            >
              Bag{" "}
              <span className="text-[10px] bg-[#D4B07B] text-black rounded-full px-1.5 py-0.2 font-bold">
                (0)
              </span>
            </Link>


            <Link
              to="/login"
              className="hidden sm:inline-block hover:text-blue-400"
            >
              Login
            </Link>
            
            {user?.role === "admin" && (
            <Link to="/admin" className="...">
              admin dashboard
            </Link>
          )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-1 focus:outline-none"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Header Categories Navigation Bar */}
      <div className="bg-[#EDD7B5] border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center space-x-6 sm:space-x-8 text-xs text-gray-700 font-medium">
          {topCategories.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-[#C5A059] transition duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-white px-6 py-6 space-y-4 text-xs uppercase tracking-wider border-t border-gray-800">
          <div className="space-y-3 pb-4 border-b border-gray-800">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-[#D4B07B]"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-2 space-y-2">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-white"
            >
              Login / Account
              
            </Link>
          </div>

          {user?.role === "admin" && (
            <Link to="/admin" className="...">
              admin dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
