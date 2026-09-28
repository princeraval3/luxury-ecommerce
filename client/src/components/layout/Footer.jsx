import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-gray-800">
          
          {/* Brand Logo & Info */}
          <div className="md:col-span-1 space-y-3">
            <h2 className="text-2xl font-serif tracking-[0.2em] font-bold text-white uppercase">
              LUXE
            </h2>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Elevating luxury fashion & lifestyle across the globe.
            </p>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4B07B] font-semibold mb-4">
              Account
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/profile" className="hover:text-white transition">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-white transition">Orders</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Shopping Bag</Link></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4B07B] font-semibold mb-4">
              Shop
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link to="/women" className="hover:text-white transition">Women</Link></li>
              <li><Link to="/men" className="hover:text-white transition">Men</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Jewellery</Link></li>
              <li><Link to="/sale" className="hover:text-white transition">Sale</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4B07B] font-semibold mb-4">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#D4B07B] font-semibold mb-4">
              Legal
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              <li><a href="#" className="hover:text-white transition">Sitemap</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Location */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} LUXE. All Rights Reserved.</p>
          <div className="flex space-x-6 text-gray-400">
            <span>India</span>
            <span>•</span>
            <span>English (UK)</span>
            <span>•</span>
            <span>INR (₹)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;