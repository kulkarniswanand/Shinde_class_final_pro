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
    <section className="bg-gradient-to-b from-gray-800 to-gray-900 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Title and Description Section */}
        <div
          className="text-center mb-12"
          data-aos="fade-down"
        >
          <h2 className="text-5xl font-extrabold text-white mb-4" data-aos="zoom-in">
            Our Vision & Mission
          </h2>
          <p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            We are committed to delivering the best educational services to our
            students and ensuring that they excel in all areas of life.
          </p>
        </div>

        {/* Vision and Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision Section */}
          <div
            className="relative bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            data-aos="fade-right"
            data-aos-delay="300"
            style={{
              backgroundImage:
                "url('https://media.istockphoto.com/id/1383796215/photo/silhouette-of-man-holding-binoculars-on-mountain-peak-against-bright-sunlight-sky-background.jpg?s=612x612&w=0&k=20&c=Y1bdRKzRcs6DVSPjqAn3fVQIdkrA-s1-uWHvnFviCOQ=')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div>
            <h3 className="relative text-4xl font-bold text-white mb-6 text-center underline underline-offset-8" data-aos="flip-left">
              Our Vision
            </h3>
            <ul className="relative list-disc text-lg text-gray-200 pl-6 space-y-4">
              <li data-aos="fade-up">🎯 To be a center of academic excellence that consistently produces top-performing students.</li>
              <li data-aos="fade-up" data-aos-delay="100">💡 To integrate technology and innovation in education for enhanced learning experiences.</li>
              <li data-aos="fade-up" data-aos-delay="200">🌱 To foster an environment that encourages personal growth, leadership, and critical thinking.</li>
              <li data-aos="fade-up" data-aos-delay="300">🌍 To empower students with the skills and knowledge needed to succeed in an ever-changing global environment.</li>
            </ul>
          </div>

          {/* Mission Section */}
          <div
            className="relative bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            data-aos="fade-left"
            data-aos-delay="300"
            style={{
              backgroundImage:
                "url('https://media.istockphoto.com/id/1215280342/photo/close-up-shot-red-darts-arrows-in-the-target-center-on-dark-blue-sky-background-business.jpg?s=612x612&w=0&k=20&c=moIlPooiE9Yd3lnJQX6GZB8SZ24A9WDiM8TZJC5u8n8=')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40 rounded-xl"></div>
            <h3 className="relative text-4xl font-bold text-white mb-6 text-center underline underline-offset-8" data-aos="flip-right">
              Our Mission
            </h3>
            <ul className="relative list-disc text-lg text-gray-200 pl-6 space-y-4">
              <li data-aos="fade-up">📚 To deliver high-quality education through innovative teaching practices and personalized learning approaches.</li>
              <li data-aos="fade-up" data-aos-delay="100">🛠️ To continuously upgrade the educational process with modern tools like TeachTrack, ensuring transparency and seamless communication.</li>
              <li data-aos="fade-up" data-aos-delay="200">🌱 To nurture students’ holistic development by promoting discipline, integrity, and social responsibility.</li>
              <li data-aos="fade-up" data-aos-delay="300">🤝 To maintain a strong connection between students, parents, and teachers for a collaborative learning experience.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
