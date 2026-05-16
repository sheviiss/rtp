import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#ffffff]/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200/60">
      
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src={logo} 
            alt="RT Pastry Logo" 
            className="h-12 w-auto object-contain" 
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">

          <Link 
            to="/" 
            className="hover:text-[#e6007e] transition duration-200"
          >
            Home
          </Link>

          <Link 
            to="/about" 
            className="hover:text-[#e6007e] transition duration-200"
          >
            About Us
          </Link>

          <Link 
            to="/outlets" 
            className="hover:text-[#e6007e] transition duration-200"
          >
            Our Outlets
          </Link>

          <Link 
            to="/contact" 
            className="hover:text-[#e6007e] transition duration-200"
          >
            Contact Us
          </Link>

          <Link
            to="/order"
            className="ml-4 px-5 py-2.5 bg-[#e6007e] text-white rounded-full text-xs font-semibold tracking-wide hover:bg-[#c4006b] shadow-sm hover:shadow transition-all duration-200"
          >
            Order Online
          </Link>

        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-stone-600 hover:text-[#e6007e] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg 
            className="w-6 h-6 fill-none stroke-current stroke-2" 
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#faf7f5] border-b border-stone-200/60 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-stone-600 shadow-inner">

          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#e6007e] py-1"
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#e6007e] py-1"
          >
            About Us
          </Link>

          <Link
            to="/outlets"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#e6007e] py-1"
          >
            Our Outlets
          </Link>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#e6007e] py-1"
          >
            Contact Us
          </Link>

          <Link
            to="/order"
            onClick={() => setIsOpen(false)}
            className="text-center px-5 py-2.5 bg-[#e6007e] text-white rounded-full text-xs font-semibold tracking-wide"
          >
            Order Online
          </Link>

        </div>
      )}

    </header>
  );
}

export default Header;