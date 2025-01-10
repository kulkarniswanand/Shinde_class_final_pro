import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const VisionMission = () => {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animations last 1 second
      easing: "ease-in-out", // Easing effect for smoothness
      once: true, // Trigger animation only once
    });
  }, []);

  return (
    <section className="bg-gradient-to-b from-blue-500 to-teal-400 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Title and Description Section */}
        <div
          className="text-center mb-12"
          data-aos="fade-down" // Animation for this section
        >
          <h2 className="text-5xl font-extrabold text-white mb-4" data-aos="zoom-in">
            Our Vision & Mission
          </h2>
          <p
            className="text-lg text-gray-200 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200" // Delay to create sequencing
          >
            We are committed to delivering the best educational services to our
            students and ensuring that they excel in all areas of life.
          </p>
        </div>

        {/* Vision and Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision Section */}
          <div
            className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            data-aos="fade-right" // Animation for Vision Section
            data-aos-delay="300" // Delay to create staggered effects
            style={{
              backgroundImage:
                "url('https://media.istockphoto.com/id/1383796215/photo/silhouette-of-man-holding-binoculars-on-mountain-peak-against-bright-sunlight-sky-background.jpg?s=612x612&w=0&k=20&c=Y1bdRKzRcs6DVSPjqAn3fVQIdkrA-s1-uWHvnFviCOQ=')",
              backgroundSize: "cover",
              position: "relative",
            }}
          >
            {/* Adding an overlay to lighten the background */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <h3
              className="text-4xl font-bold text-white mb-6 text-center underline underline-offset-8"
              data-aos="flip-left" // Flip effect for the title
            >
              Our Vision
            </h3>
            <ul className="list-disc text-lg text-gray-200 pl-6 space-y-4">
              <li data-aos="fade-up">
                <span className="inline-block mr-4 text-blue-400">🎯</span>
                <span className="text-white">To be a center of academic excellence that consistently produces top-performing students.</span>
              </li>
              <li data-aos="fade-up" data-aos-delay="100">
                <span className="inline-block mr-4 text-blue-400">💡</span>
                <span className="text-white">To integrate technology and innovation in education for enhanced learning experiences.</span>
              </li>
              <li data-aos="fade-up" data-aos-delay="200">
                <span className="inline-block mr-4 text-blue-400">🌱</span>
                <span className="text-white">To foster an environment that encourages personal growth, leadership, and critical thinking.</span>
              </li>
              <li data-aos="fade-up" data-aos-delay="300">
                <span className="inline-block mr-4 text-blue-400">🌍</span>
                <span className="text-white">To empower students with the skills and knowledge needed to succeed in an ever-changing global environment.</span>
              </li>
            </ul>
          </div>

          {/* Mission Section */}
          <div
            className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            data-aos="fade-left" // Animation for Mission Section
            data-aos-delay="300" // Delay to create staggered effects
            style={{
              backgroundImage:
                "url('https://media.istockphoto.com/id/1215280342/photo/close-up-shot-red-darts-arrows-in-the-target-center-on-dark-blue-sky-background-business.jpg?s=612x612&w=0&k=20&c=moIlPooiE9Yd3lnJQX6GZB8SZ24A9WDiM8TZJC5u8n8=')",
              backgroundSize: "cover",
              position: "relative",
            }}
          >
            {/* Adding an overlay to lighten the background */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <h3
              className="text-4xl font-bold text-white mb-6 text-center underline underline-offset-8"
              data-aos="flip-right" // Flip effect for the title
            >
              Our Mission
            </h3>
            <ul className="list-disc text-lg text-gray-200 pl-6 space-y-4">
              <li data-aos="fade-up">
                <span className="inline-block mr-4 text-purple-400">📚</span>
                <span className="text-white">To deliver high-quality education through innovative teaching practices and personalized learning approaches.</span>
              </li>
              <li data-aos="fade-up" data-aos-delay="100">
                <span className="inline-block mr-4 text-purple-400">🛠️</span>
                <span className="text-white">To continuously upgrade the educational process with modern tools like TeachTrack, ensuring transparency and seamless communication.</span>
              </li>
              <li data-aos="fade-up" data-aos-delay="200">
                <span className="inline-block mr-4 text-purple-400">🌱</span>
                <span className="text-white">To nurture students’ holistic development by promoting discipline, integrity, and social responsibility.</span>
              </li>
              <li data-aos="fade-up" data-aos-delay="300">
                <span className="inline-block mr-4 text-purple-400">🤝</span>
                <span className="text-white">To maintain a strong connection between students, parents, and teachers for a collaborative learning experience.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action Section */}
        <div
          className="mt-12 text-center"
          data-aos="zoom-in-up" // Zoom-in-up effect
        >
          <button
            className="bg-indigo-600 text-white py-3 px-8 rounded-lg text-xl transform transition-all duration-300 hover:bg-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl"
            data-aos="pulse" // Pulse effect for the button
            data-aos-delay="500" // Delay to ensure proper timing
          >
            Join Us on Our Journey!
          </button>
        </div>

        {/* Inspirational Quotes Section */}
        <div className="mt-16 text-center px-4 md:px-12" data-aos="fade-up">
          <h3 className="text-3xl font-bold text-white mb-8">Inspirational Educational Quotes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 md:px-8">
            {/* Quote 1 - Dr. A.P.J. Abdul Kalam */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
              <p className="text-lg text-gray-700 italic mb-4">
                "Dream, Dream, Dream. Dreams transform into thoughts, and thoughts result in action."
              </p>
              <p className="text-right font-semibold text-gray-800">Dr. A.P.J. Abdul Kalam</p>
            </div>

            {/* Quote 2 - Dr. B.R. Ambedkar */}
            <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
              <p className="text-lg text-gray-700 italic mb-4">
                "Knowledge is the basis of human life. To enhance the intellectual capacity of the students. Also, every effort should be made to increase their intelligence."
              </p>
              <p className="text-right font-semibold text-gray-800">Dr. B.R. Ambedkar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
