import React from "react";
import { Link } from "react-router-dom";

const Admissions = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-500">
          Admissions
        </h1>
        <p className="mb-4 leading-relaxed">
          Join Shinde Classes and unlock your potential. Our admissions process
          is simple and transparent.
        </p>
        <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
        <p className="mb-4 leading-relaxed">
          Fill out the registration form and submit the required documents. Our
          team will contact you for the next steps.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="leading-relaxed">
          For admissions-related queries, please{" "}
          <Link to="/contact" className="text-indigo-500 underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Admissions;
