import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#fffaf8] text-stone-700 pt-16 pb-8 mt-auto border-t border-stone-200/60">
      
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* Column 1: Brand/About & Socials */}
        <div className="flex flex-col items-center md:items-start gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold tracking-wider text-[#e6007e]">RT Pastry</h3>
            <p className="text-sm text-stone-500 leading-relaxed max-w-sm mx-auto md:mx-0">
              Freshly baked happiness everyday. Crafting premium Japanese-Taiwanese style pastries, cakes, and breads with love since 2003.
            </p>
          </div>
          
          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.facebook.com/RTPastryMalaysia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-[#e6007e] hover:border-[#e6007e] hover:shadow-sm transition-all duration-200"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
              </svg>
            </a>
            
            <a 
              href="https://www.instagram.com/rtpastry/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-[#e6007e] hover:border-[#e6007e] hover:shadow-sm transition-all duration-200"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links - MATCHED TO YOUR PAGES FOLDER */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#e6007e]">Explore</h3>
          <ul className="text-sm text-stone-500 space-y-3">
            <li><Link to="/" className="hover:text-[#e6007e] transition duration-200">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#e6007e] transition duration-200">About Us</Link></li>
            <li><Link to="/outlets" className="hover:text-[#e6007e] transition duration-200">Our Outlets</Link></li>
            <li><Link to="/contact" className="hover:text-[#e6007e] transition duration-200">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Store Info */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#e6007e]">Business Hours</h3>
          <div className="text-sm text-stone-500 space-y-1">
            <p className="font-medium text-stone-700">Open Daily</p>
            <p>8:00 AM - 10:00 PM</p>
          </div>
          <p className="text-xs text-stone-400 italic">
            *Hours may vary by outlet.
          </p>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="mt-10 pt-1 text-center text-xs text-stone-400">
        <p>&copy; {new Date().getFullYear()} RT Pastry. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;