import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaArrowUp,
  FaEnvelope,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`relative ${
        isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-900 to-black"
      } text-white transition-all duration-500`}
    >
      {/* Dark Mode Toggle (Floating Button) */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 p-3 rounded-full text-white hover:bg-gray-600 transition"
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>
      </div>

      {/* Call-to-Action Section */}
      <div className="py-5 bg-gradient-to-br from-purple-700 to-blue-600 text-center">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Unlock Your Potential with Shinde Classes!
        </h3>
        <a
          href="/admissions"
          className="px-6 py-3 bg-yellow-500 text-black rounded-full font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-md transform hover:scale-105"
        >
          Enroll Now
        </a>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Map Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-primary inline-block">
              Location
            </h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d476.1811664948623!2d74.33422038375454!3d17.29385621727529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc17bb7fff3f3b5%3A0xad51c219aee7d019!2sBank%20of%20India%20Kadegaon%20Branch!5e0!3m2!1sen!2sin!4v1730953800110!5m2!1sen!2sin"
              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
              title="Map"
              className="border-0 rounded-lg shadow-md"
            ></iframe>
            <p className="text-gray-300 text-sm mt-2">
              📍 Visit us at Kadegaon, near Bank of India.
            </p>
          </div>

          {/* Logo and Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-primary inline-block">
              Shinde Classes
            </h3>
            <img
              src="/images/footer/logo.png"
              alt="Shinde Classes Logo"
              className="mb-4 w-32 transform hover:scale-105 transition-all duration-300"
            />
            <p className="text-gray-400 leading-relaxed">
              Providing quality education to empower students for academic and personal excellence.
            </p>
            <p className="text-gray-400 mt-2">📞 +91 1234567890</p>
            <p className="text-gray-400">✉️ contact@shindeclasses.com</p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-primary inline-block">
              Important Links
            </h3>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Admissions", "Careers"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-400 hover:text-primary hover:underline transition transform hover:scale-105"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-primary inline-block">
              Navigation
            </h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Our Facilities", "Achievements", "Gallery", "Contact Us"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-400 hover:text-primary hover:underline transition transform hover:scale-105"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-12 flex flex-col items-center space-y-6 text-center">
          <div className="flex space-x-6">
            {[
              { icon: FaFacebook, link: "https://www.facebook.com/share/1AHXyXfTvC/", color: "#1877F2" },
              { icon: FaTwitter, link: "https://twitter.com", color: "#1DA1F2" },
              { icon: FaEnvelope, link: "mailto:contact@shindeclasses.com", color: "#D44638" },
              { icon: FaYoutube, link: "https://www.youtube.com/@shankarshinde6299", color: "#FF0000" },
            ].map(({ icon: Icon, link, color }, index) => (
              <a
                key={index}
                href={link}
                className="text-gray-400 hover:text-primary transition transform hover:scale-110"
                style={{ color }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Shinde Classes. All rights reserved.
          </p>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-300 transition transform hover:scale-105 flex items-center space-x-1"
          >
            <FaArrowUp />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
