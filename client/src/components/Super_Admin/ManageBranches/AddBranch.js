import React, { useState } from "react";

export default function AddBranch() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Branch name is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = "Password must include an uppercase letter, a number, and a special character.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/branch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Branch created successfully!");
        setFormData({ name: "", location: "", username: "", password: "" });
        setErrors({});
      } else {
        const errorData = await response.json();
        setServerError(errorData.message || "Failed to create branch.");
      }
    } catch (error) {
      console.error("Error creating branch:", error);
      setServerError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle clearing the form
  const handleClear = () => {
    setFormData({ name: "", location: "", username: "", password: "" });
    setErrors({});
    setServerError("");
    setSuccessMessage("");
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Create New Branch</h2>
      
      {/* Success Message */}
      {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

      {/* Server Error */}
      {serverError && <p className="text-red-500 text-center mb-4">{serverError}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Branch Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Branch Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring ${
              errors.name ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Enter branch name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring ${
              errors.location ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Enter location"
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring ${
              errors.username ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Enter username"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring ${
              errors.password ? "border-red-500" : "border-gray-600"
            }`}
            placeholder="Enter password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Branch"}
          </button>
          <button
            type="button"
            className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-all"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
