import React from "react";
import { Link } from "react-router-dom";

const Careers = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-500">
          Careers
        </h1>
        <p className="mb-4 leading-relaxed">
          Join our team at Shinde Classes and make a difference in the lives of
          students.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Current Openings</h2>
        <p className="mb-4 leading-relaxed">
          We are looking for passionate educators and staff. Send your resume to{" "}
          <a
            href="mailto:careers@shindeclasses.com"
            className="text-indigo-500 underline"
          >
            careers@shindeclasses.com
          </a>
          .
        </p>
        <h2 className="text-2xl font-semibold mb-4">Why Join Us?</h2>
        <p className="leading-relaxed">
          Be part of a team that values education and innovation. We offer a
          collaborative work environment and growth opportunities. For more
          details, please{" "}
          <Link to="/contact" className="text-indigo-500 underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Careers;
