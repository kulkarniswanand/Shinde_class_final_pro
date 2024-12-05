import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Map Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Location</h3>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d476.1811664948623!2d74.33422038375454!3d17.29385621727529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc17bb7fff3f3b5%3A0xad51c219aee7d019!2sBank%20of%20India%20Kadegaon%20Branch!5e0!3m2!1sen!2sin!4v1730953800110!5m2!1sen!2sin"
                            width="100%"
                            height="200"
                            allowFullScreen=""
                            loading="lazy"
                            title="Map"
                            className="border-0 rounded-lg"
                        ></iframe>
                    </div>

                    {/* Logo and Description Section */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Shinde Classes</h3>
                        <img src="/images/footer/logo.png" alt="Shinde Classes Logo" className="mb-4 w-32" />
                        <p className="text-gray-400">
                            Shinde Classes aims to provide quality education to empower students with the knowledge and skills needed to excel.
                        </p>
                    </div>

                    {/* Important Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Important Links</h3>
                        <ul className="space-y-2">
                            <li><a href="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                            <li><a href="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                            <li><a href="/admissions" className="text-gray-400 hover:text-white">Admissions</a></li>
                            <li><a href="/careers" className="text-gray-400 hover:text-white">Careers</a></li>
                        </ul>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                            <li><a href="/about" className="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a href="/features" className="text-gray-400 hover:text-white">Our Facilities</a></li>
                            <li><a href="/achievements" className="text-gray-400 hover:text-white">Achievements</a></li>
                            <li><a href="/gallery" className="text-gray-400 hover:text-white">Gallery</a></li>
                            <li><a href="/contact" className="text-gray-400 hover:text-white">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                {/* Social Media and Copyright */}
                <div className="mt-8 flex flex-col items-center text-center space-y-4">
                    <div className="flex space-x-6">
                        <a href="https://facebook.com" className="text-gray-400 hover:text-white"><FaFacebook /></a>
                        <a href="https://twitter.com" className="text-gray-400 hover:text-white"><FaTwitter /></a>
                        <a href="https://instagram.com" className="text-gray-400 hover:text-white"><FaInstagram /></a>
                    </div>
                    <p className="text-gray-500">&copy; {new Date().getFullYear()} Shinde Classes. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
