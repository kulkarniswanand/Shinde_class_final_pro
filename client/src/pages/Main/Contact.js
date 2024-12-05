import React, { useState } from "react";


const ContactUs = () => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/mqakwvzn", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStatus("SUCCESS");
      form.reset();
    } else {
      setStatus("ERROR");
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <section className="min-h-screen flex items-center bg-gradient-to-r from-blue-50 to-blue-200">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between">
          {/* Left Side */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
            <h1 className="text-5xl font-bold text-blue-900">
              Get in Touch With Us!
            </h1>
            <p className="text-lg text-gray-700">
              Have questions or need more information? Fill out the form, and
              we’ll get back to you promptly.
            </p>
            <img
              src="https://unblast.com/wp-content/uploads/2020/09/Contact-Us-Vector-Illustration-Part-02-1.jpg"
              alt="Contact illustration"
              className="w-full max-w-md mx-auto lg:mx-0"
            />
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-lg p-8 md:p-12">
            <h2 className="text-3xl font-semibold text-blue-800 text-center mb-6">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>

            {status === "SUCCESS" && (
              <p className="text-green-600 mt-4 text-center">
                Thank you! Your message has been sent.
              </p>
            )}
            {status === "ERROR" && (
              <p className="text-red-600 mt-4 text-center">
                Oops! There was an error. Please try again.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
