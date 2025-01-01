// src/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaCogs, FaTrophy, FaImages, FaPhone, FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/Home" className="text-white font-bold text-2xl tracking-wide">
              Shinde Classes
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              <NavItem to="/Home" icon={<FaHome />} label="Home" />
              <NavItem to="/about" icon={<FaInfoCircle />} label="About" />
              <NavItem to="/features" icon={<FaCogs />} label="Features" />
              <NavItem to="/achievements" icon={<FaTrophy />} label="Achievements" />
              <NavItem to="/gallery" icon={<FaImages />} label="Gallery" />
              <NavItem to="/contact" icon={<FaPhone />} label="Contact Us" />
            </div>
            <Link
              to="/login"
              className="text-white px-4 py-2 rounded-full font-medium bg-black border-2 border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
            >
              <FaSignInAlt className="inline-block mr-2" />
              Login
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white p-2 rounded-md hover:bg-indigo-600 transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavItem to="/Home" label="Home" setIsOpen={setIsOpen} />
            <MobileNavItem to="/about" label="About" setIsOpen={setIsOpen} />
            <MobileNavItem to="/features" label="Features" setIsOpen={setIsOpen} />
            <MobileNavItem to="/achievements" label="Achievements" setIsOpen={setIsOpen} />
            <MobileNavItem to="/gallery" label="Gallery" setIsOpen={setIsOpen} />
            <MobileNavItem to="/contact" label="Contact Us" setIsOpen={setIsOpen} />
            <MobileNavItem to="/login" label="Login" setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop Navigation Item
const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="text-white text-lg font-medium hover:text-black hover:bg-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center"
  >
    {icon}
    <span className="ml-2">{label}</span>
  </Link>
);

// Mobile Navigation Item
const MobileNavItem = ({ to, label, setIsOpen }) => (
  <Link
    to={to}
    onClick={() => setIsOpen(false)} // Close the menu on item click
    className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-all duration-300"
  >
    {label}
  </Link>
);

export default Navbar;
