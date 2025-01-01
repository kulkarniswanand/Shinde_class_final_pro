import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Call-to-Action Section */}
      <div className="py-8 bg-gray-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h3 className="text-xl font-semibold">
            Join Shinde Classes and Shape Your Future!
          </h3>
          <a
            href="/admissions"
            className="px-6 py-3 bg-primary text-black rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300"
          >
            Enroll Now
          </a>
        </div>
      </div>

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
          </div>

          {/* Logo and Description Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-primary inline-block">
              Shinde Classes
            </h3>
            <img
              src="/images/footer/logo.png"
              alt="Shinde Classes Logo"
              className="mb-4 w-32"
            />
            <p className="text-gray-400 leading-relaxed">
              Shinde Classes provides quality education, empowering students to
              achieve excellence in their academic and personal growth.
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-primary inline-block">
              Important Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-of-service"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/admissions"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Admissions
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b-2 border-primary inline-block">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-primary transition">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-primary transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/features"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Our Facilities
                </a>
              </li>
              <li>
                <a
                  href="/achievements"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Achievements
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-primary transition"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-12 flex flex-col items-center space-y-6 text-center">
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-primary hover:scale-110 transform transition"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-primary hover:scale-110 transform transition"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-primary hover:scale-110 transform transition"
            >
              <FaInstagram size={24} />
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Shinde Classes. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
