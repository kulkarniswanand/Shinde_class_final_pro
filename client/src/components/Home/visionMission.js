import React from "react";

const VisionMission = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-200 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Our Vision & Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are committed to delivering the best educational services to our
            students and ensuring that they excel in all areas of life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision Section */}
          <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-4xl font-bold text-blue-600 mb-6 text-center underline underline-offset-8">
              Our Vision
            </h3>
            <ul className="list-disc text-lg text-gray-700 pl-6 space-y-4">
              <li>
                To be a center of academic excellence that consistently produces
                top-performing students.
              </li>
              <li>
                To integrate technology and innovation in education for enhanced
                learning experiences.
              </li>
              <li>
                To foster an environment that encourages personal growth,
                leadership, and critical thinking.
              </li>
              <li>
                To empower students with the skills and knowledge needed to
                succeed in an ever-changing global environment.
              </li>
            </ul>
          </div>

          {/* Mission Section */}
          <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-4xl font-bold text-green-600 mb-6 text-center underline underline-offset-8">
              Our Mission
            </h3>
            <ul className="list-disc text-lg text-gray-700 pl-6 space-y-4">
              <li>
                To deliver high-quality education through innovative teaching
                practices and personalized learning approaches.
              </li>
              <li>
                To continuously upgrade the educational process with modern
                tools like TeachTrack, ensuring transparency and seamless
                communication.
              </li>
              <li>
                To nurture students’ holistic development by promoting
                discipline, integrity, and social responsibility.
              </li>
              <li>
                To maintain a strong connection between students, parents, and
                teachers for a collaborative learning experience.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
