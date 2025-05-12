import React from "react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-500">
          Terms of Service
        </h1>
        <p className="mb-4 leading-relaxed">
          Welcome to Shinde Classes. By using our services, you agree to the
          following terms and conditions.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Usage Guidelines</h2>
        <p className="mb-4 leading-relaxed">
          You agree to use our services responsibly and not engage in any
          activities that may harm our platform or other users.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Termination</h2>
        <p className="mb-4 leading-relaxed">
          We reserve the right to terminate your access to our services if you
          violate these terms.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="leading-relaxed">
          For any questions about these terms, please{" "}
          <Link to="/contact" className="text-indigo-500 underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
