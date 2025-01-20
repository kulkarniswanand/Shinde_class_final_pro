import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const DirectorsMessage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  return (
    <section className="relative bg-white py-5">
      {/* Main Content */}
      <div className="relative z-10 border-4 border-purple-300 rounded-3xl p-8 shadow-2xl bg-white">
        <div className="absolute inset-0 border-8 border-gray-200 rounded-3xl bg-black -z-10"></div>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Director's Image */}
            <div className="lg:w-1/3 w-full" data-aos="fade-right">
              <div className="relative group overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <img
                  src="/Images/shindesir.jpg"
                  alt="Director"
                  className="object-cover w-full h-96 transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
              </div>

              {/* Educational Image */}
              <div className="mt-8 relative group overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-500">
                <img
                  src="/Images/educational.jpg"
                  alt="Educational Environment"
                  className="object-cover w-full h-72 transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
              </div>
            </div>

            {/* Director's Message */}
            <div className="lg:w-2/3 w-full text-center lg:text-left" data-aos="fade-left">
            <h2 className="text-5xl font-extrabold text-white mb-6">
             Director's Message
            </h2>
              <p
                className="text-lg leading-relaxed mb-8 max-w-xl mx-auto bg-gradient-to-r from-gray-100 via-blue-50 to-gray-100 p-4 rounded-lg shadow-md text-gray-800"
                data-aos="fade-up"                
              >
                Welcome to Shinde Classes, where education meets excellence! Our
                mission is to foster an environment that encourages learning,
                creativity, and personal growth for each student. Through our
                cutting-edge TeachTrack system, we are excited to bring seamless
                class management and better communication between students, parents,
                and teachers.
              </p>
              <p
                className="text-lg leading-relaxed mb-8 max-w-xl mx-auto bg-gradient-to-r from-indigo-100 via-pink-100 to-yellow-100 p-4 rounded-lg shadow-md text-gray-800"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                We believe in the power of technology to enhance education, and
                with TeachTrack, we are empowering both students and parents to stay
                informed and engaged. I am proud of the hard work and dedication that
                has gone into developing this platform.
              </p>
              <p
                className="text-xl text-white-700 italic font-semibold"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                - Shinde Sir, Director
              </p>

              {/* Achievements */}
              <div className="flex justify-around mt-8 gap-8" data-aos="fade-up">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-blue-100">5000+</h3>
                  <p className="text-white-800">Students Coached</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-yellow-100">10+ Years</h3>
                  <p className="text-white-800">Teaching Experience</p>
                </div>
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-green-100">80%+</h3>
                  <p className="text-white-800">Students Scored Above 85%</p>
                </div>
              </div>

              {/* Testimonial Carousel */}
              <div className="mt-12 bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100 p-6 rounded-2xl shadow-lg" data-aos="fade-up">
                <h3 className="text-2xl font-semibold text-indigo-800 mb-4">
                  Student Testimonials
                </h3>
                <div className="text-gray-800 italic text-lg font-medium leading-relaxed">
                  <span className="text-pink-700 text-5xl font-serif">&ldquo;</span>
                  Shinde Classes transformed my learning experience. The
                  personalized attention and innovative teaching methods were
                  exceptional.
                  <span className="text-pink-700 text-5xl font-serif">&rdquo;</span>
                </div>
                <p className="text-right text-gray-600 mt-4">- A Grateful Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorsMessage;
