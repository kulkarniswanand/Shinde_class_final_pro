import React from "react";
import Footer from "../../components/Home/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative">
      {/* Diagonal Divider */}
      <div className="absolute w-full h-96 bg-gradient-to-r from-blue-500 to-purple-500 transform -skew-y-3 -z-10"></div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row flex-grow relative z-10">
        {/* Left Side Content */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-lg p-8 rounded-lg">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
              About <span className="text-blue-600">Us</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At <span className="font-semibold text-blue-500">Shinde Classes</span>,
              we are committed to excellence, innovation, and integrity. Our goal
              is to empower students with the tools they need to excel academically
              and personally.
            </p>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed">
              From expert instruction to state-of-the-art resources, we provide an
              environment where learning thrives. Join us to experience education
              that transforms and inspires.
            </p>
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transform transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex-1 relative">
          <img
            src="./images/About/students.jpg"
            alt="About Us"
            className="w-full h-full object-cover rounded-tl-3xl transform hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>

      {/* Footer Section */}
      {/* <Footer /> */}
    </div>
  );
};

export default About;