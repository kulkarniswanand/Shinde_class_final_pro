import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll"; // Import from react-scroll
import { Link as RouterLink } from "react-router-dom"; // Import for routing links
import { FaHome, FaInfoCircle, FaCogs, FaTrophy, FaImages, FaPhone, FaSignInAlt } from "react-icons/fa";

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
            <RouterLink to="/" className="text-white font-bold text-2xl tracking-wide">
              Shinde Classes
            </RouterLink>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <ScrollNavItem to="home" icon={<FaHome />} label="Home" />
            <ScrollNavItem to="about" icon={<FaInfoCircle />} label="About" />
            <ScrollNavItem to="features" icon={<FaCogs />} label="Features" />
            <ScrollNavItem to="achievements" icon={<FaTrophy />} label="Achievements" />
            <ScrollNavItem to="gallery" icon={<FaImages />} label="Gallery" />
            <ScrollNavItem to="contact" icon={<FaPhone />} label="Contact Us" />

            <RouterLink
              to="/login"
              className="text-white px-4 py-2 rounded-full font-medium bg-black border-2 border-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
            >
              <FaSignInAlt className="inline-block mr-2" />
              Login
            </RouterLink>
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
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
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
            <MobileScrollNavItem to="home" label="Home" setIsOpen={setIsOpen} />
            <MobileScrollNavItem to="about" label="About" setIsOpen={setIsOpen} />
            <MobileScrollNavItem to="features" label="Features" setIsOpen={setIsOpen} />
            <MobileScrollNavItem to="achievements" label="Achievements" setIsOpen={setIsOpen} />
            <MobileScrollNavItem to="gallery" label="Gallery" setIsOpen={setIsOpen} />
            <MobileScrollNavItem to="contact" label="Contact Us" setIsOpen={setIsOpen} />
            <RouterLink to="/login" className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-all duration-300">
              Login
            </RouterLink>
          </div>
        </div>
      )}
    </nav>
  );
};

// Smooth Scrolling Navigation Item (For Desktop)
const ScrollNavItem = ({ to, icon, label }) => (
  <ScrollLink
    to={to}
    smooth={true}
    duration={500}
    spy={true}
    offset={-70} // Adjust offset for navbar height
    className="text-white text-lg font-medium hover:text-black hover:bg-white px-3 py-2 rounded-lg transition-all duration-300 flex items-center cursor-pointer"
  >
    {icon}
    <span className="ml-2">{label}</span>
  </ScrollLink>
);

// Smooth Scrolling Navigation Item (For Mobile)
const MobileScrollNavItem = ({ to, label, setIsOpen }) => (
  <ScrollLink
    to={to}
    smooth={true}
    duration={500}
    spy={true}
    offset={-70}
    onClick={() => setIsOpen(false)} // Close the menu after clicking
    className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-purple-700 transition-all duration-300 cursor-pointer"
  >
    {label}
  </ScrollLink>
);

export default Navbar;
