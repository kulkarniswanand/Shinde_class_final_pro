import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Icons for password visibility

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
  const [showPassword, setShowPassword] = useState(false); // Password visibility state

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Branch name is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = "Must include uppercase, number, and special character.";
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
        setSuccessMessage("Branch created successfully! 🎉");
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
    <div className="max-w-lg mx-auto bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Create New Branch</h2>

      {/* Success Message */}
      {successMessage && <p className="text-green-400 text-center p-3 rounded-md bg-green-800">{successMessage}</p>}

      {/* Server Error */}
      {serverError && <p className="text-red-400 text-center p-3 rounded-md bg-red-800">{serverError}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Branch Name */}
        <div className="relative">
          <label htmlFor="name" className="block text-sm font-medium text-gray-400">Branch Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter branch name"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Location */}
        <div className="relative">
          <label htmlFor="location" className="block text-sm font-medium text-gray-400">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location"
          />
          {errors.location && <p className="text-red-400 text-sm mt-1">{errors.location}</p>}
        </div>

        {/* Username */}
        <div className="relative">
          <label htmlFor="username" className="block text-sm font-medium text-gray-400">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter username"
          />
          {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
        </div>

        {/* Password with Toggle */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 pr-10 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Branch"}
          </button>
          <button
            type="button"
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
