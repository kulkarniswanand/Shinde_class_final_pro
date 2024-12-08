import React from "react";

const DirectorsMessage = () => {
  return (
    <section className="bg-gradient-to-br from-purple-100 to-blue-50 py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Director's Image */}
          <div className="lg:w-1/3 w-full">
            <div className="relative group">
              <img
                src="/Images/shindesir.jpg"
                alt="Director"
                className="rounded-lg shadow-lg object-cover w-full h-96 transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 rounded-lg transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Director's Message */}
          <div className="lg:w-2/3 w-full text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              Director's Message
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              "Welcome to Shinde Classes, where education meets excellence! Our
              mission is to foster an environment that encourages learning,
              creativity, and personal growth for each student. Through our
              cutting-edge TeachTrack system, we are excited to bring seamless
              class management and better communication between students,
              parents, and teachers. This initiative ensures that every student
              receives timely support, feedback, and access to their academic
              progress.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We believe in the power of technology to enhance education, and
              with TeachTrack, we are empowering both students and parents to
              stay informed and engaged. I am proud of the hard work and
              dedication that has gone into developing this platform, and I
              trust it will significantly enhance the learning experience at
              Shinde Classes. Thank you for your continued trust in us as we
              build a brighter future together."
            </p>
            <p className="text-xl text-gray-600 italic font-medium">
              - Shinde Sir, Director
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorsMessage;
