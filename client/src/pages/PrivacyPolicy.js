import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-500">
          Privacy Policy
        </h1>
        <p className="mb-4 leading-relaxed">
          At Shinde Classes, we are committed to protecting your privacy. This
          Privacy Policy outlines how we collect, use, and safeguard your
          personal information.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-4 leading-relaxed">
          We collect personal information such as your name, email address,
          phone number, and other details when you register or interact with
          our services.
        </p>
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="mb-4 leading-relaxed">
          Your information is used to provide and improve our services, process
          your requests, and communicate with you. We do not share your
          information with third parties without your consent.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="mb-4 leading-relaxed">
          You have the right to access, update, or delete your personal
          information. Please contact us if you wish to exercise these rights.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions about this Privacy Policy, please{" "}
          <Link to="/contact" className="text-indigo-500 underline">
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
