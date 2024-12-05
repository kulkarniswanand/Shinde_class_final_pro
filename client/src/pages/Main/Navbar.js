// src/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Shinde Classes
            </Link>
          
          
          </div>
          <div className="hidden md:flex items-center space-x-11">
            <div className="ml-10 flex items-baseline space-x-11">
              <Link
                to="/Home"
                className="text-white px-3 py-2 rounded-md text-1xl font-medium hover:bg-yellow-700"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white px-3 py-2 rounded-md text-1xl font-medium hover:bg-blue-700"
              >
                About
              </Link>
              <Link
                to="/features"
                className="text-white px-3 py-2 rounded-md text-1xl font-medium hover:bg-blue-700"
              >
                Features
              </Link>
              <Link
                to="/achievements"
                className="text-white px-3 py-2 rounded-md text-1xl font-medium hover:bg-blue-700"
              >
                Achievements
              </Link>
              <Link
                to="/gallery"
                className="text-white px-3 py-2 rounded-md text-1xl font-medium hover:bg-blue-700"
              >
                Gallery
              </Link>
              <Link
                to="/contact"
                className="text-white px-3 py-2 rounded-md text-1xl font-medium hover:bg-blue-700"
              >
                Contact Us
              </Link>
            </div>
            {/* Login Button */}
            <Link
              to="/login"
              className="text-white px-3 py-2 rounded-md text-1xl font-medium bg-black border-blue-600 border-2 hover:bg-slate-300 hover:text-slate-950 hover:border-black transition-all ease-in-out duration-1000"
            >
              Login
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-blue-700 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                // Menu Icon
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
                // Close Icon
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
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              About
            </Link>
            <Link
              to="/features"
              onClick={() => setIsOpen(false)}
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              Features
            </Link>
            <Link
              to="/achievements"
              onClick={() => setIsOpen(false)}
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              Achievements
            </Link>
            <Link
              to="/gallery"
              onClick={() => setIsOpen(false)}
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              Contact Us
            </Link>
            {/* Mobile Login Button */}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-white block px-3 py-2 rounded-md text-base font-medium bg-black border-blue-600 border-2 hover:bg-slate-300 hover:text-slate-950 hover:border-black transition-all ease-in-out duration-1000"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
