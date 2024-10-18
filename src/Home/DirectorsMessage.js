import React from "react";

const DirectorsMessage = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Director's Image */}
          <div className="md:w-1/3 w-full mb-8 md:mb-0">
            <img
              src="/Images/shindesir.jpg"
              alt="Director"
              className="rounded-lg shadow-lg object-cover w-full h-96"
            />
          </div>

          {/* Director's Message */}
          <div className="md:w-2/3 w-full md:pl-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Director's Message
            </h2>
            <p className="text-gray-600 mb-6">
              "Welcome to Shinde Classes, where education meets excellence! Our
              mission is to foster an environment that encourages learning,
              creativity, and personal growth for each student. Through our
              cutting-edge TeachTrack system, we are excited to bring seamless
              class management and better communication between students,
              parents, and teachers. This initiative ensures that every student
              receives timely support, feedback, and access to their academic
              progress. We believe in the power of technology to enhance
              education, and with TeachTrack, we are empowering both students
              and parents to stay informed and engaged. I am proud of the hard
              work and dedication that has gone into developing this platform,
              and I trust it will significantly enhance the learning experience
              at Shinde Classes. Thank you for your continued trust in us as we
              build a brighter future together."
            </p>
            <p className="text-gray-600 italic">- Shinde Sir, Director</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorsMessage;
