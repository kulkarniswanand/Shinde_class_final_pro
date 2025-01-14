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
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-teal-90 to-indigo-500 py-10">
      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-32 h-32 bg-teal-300 rounded-full opacity-50 blur-3xl animate-float"></div>
        <div className="w-48 h-48 bg-indigo-200 rounded-full opacity-40 blur-2xl animate-float-slower"></div>
      </div>

      {/* Elegant Double Border Outline Container */}
      <div className="relative z-10 border-2 border-transparent rounded-xl p-4 overflow-hidden shadow-xl bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-600">
        {/* Double Border Effect */}
        <div className="absolute inset-0 border-4 border-transparent rounded-xl bg-gradient-to-r from-blue-500 via-teal-400 to-indigo-600 -z-10"></div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Director's Image */}
            <div className="lg:w-1/3 w-full" data-aos="fade-right">
              <div className="relative group overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <img
                  src="/Images/shindesir.jpg"
                  alt="Director"
                  className="object-cover w-full h-96 transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 rounded-lg transition-opacity duration-300"></div>
              </div>

              {/* Educational Image */}
              <div className="mt-8 relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
                <img
                  src="/Images/educational.jpg"
                  alt="Educational Environment"
                  className="object-cover w-full h-72 transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 rounded-lg transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Director's Message */}
            <div className="lg:w-2/3 w-full text-center lg:text-left" data-aos="fade-left">
              <h2 className="text-5xl font-extrabold text-indigo-900 mb-6 text-shadow-xl animate-gradient">
                Director's Message
              </h2>
              {/* White text for the Director's message paragraphs */}
              <p
                className="text-lg text-white leading-relaxed mb-8 max-w-xl mx-auto transition-transform transform hover:scale-105 hover:text-gray-900 duration-300"
                data-aos="fade-up"
              >
                "Welcome to Shinde Classes, where education meets excellence! Our
                mission is to foster an environment that encourages learning,
                creativity, and personal growth for each student. Through our
                cutting-edge TeachTrack system, we are excited to bring seamless
                class management and better communication between students, parents,
                and teachers."
              </p>
              <p
                className="text-lg text-white leading-relaxed mb-8 max-w-xl mx-auto transition-transform transform hover:scale-105 hover:text-gray-900 duration-300"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                "We believe in the power of technology to enhance education, and
                with TeachTrack, we are empowering both students and parents to stay
                informed and engaged. I am proud of the hard work and dedication that
                has gone into developing this platform."
              </p>
              <p
                className="text-xl text-indigo-900 italic font-medium"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                - Shinde Sir, Director
              </p>

              {/* Achievements */}
              <div className="flex justify-around mt-8" data-aos="fade-up">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900">5000+</h3>
                  <p className="text-gray-900">Students Coached</p>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900">10+ Years</h3>
                  <p className="text-gray-900">Teaching Experience</p>
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900">80%+</h3>
                  <p className="text-gray-900">Students Scored Above 85%</p>
                </div>
              </div>

              {/* Animated Testimonials */}
              <div className="mt-12" data-aos="fade-up">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Voices of Excellence
                </h3>
                <div className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-50 opacity-40 z-0"></div>
                  <blockquote className="text-gray-700 italic text-xl font-medium leading-relaxed relative z-10">
                    <span className="text-indigo-600 text-4xl font-serif">&ldquo;</span>
                    Shinde Classes transformed my learning experience. The
                    personalized attention and innovative teaching methods were
                    exceptional.
                    <span className="text-indigo-600 text-4xl font-serif">&rdquo;</span>
                  </blockquote>
                  <p className="text-right text-gray-600 mt-4 relative z-10">
                    - Student Testimonial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorsMessage;
