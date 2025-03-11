import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const StudentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    gender: "",
    dob: "",
    parentMobile: "",
    studentMobile: "",
    email: "",
    class: "",
    branch: "",
  }); 

  const [errors, setErrors] = useState({});
  const [admissionDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.parentMobile.match(/^\d{10}$/)) newErrors.parentMobile = "Parent's mobile must be 10 digits.";
    if (formData.studentMobile && !formData.studentMobile.match(/^\d{10}$/))
      newErrors.studentMobile = "Student's mobile must be 10 digits.";
    if (formData.email && !formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email address.";
    if (!formData.class) newErrors.class = "Class is required.";
    if (!formData.branch) newErrors.branch = "Branch is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    if (!window.confirm("Are you sure you want to submit this form?")) return;
  
    setIsSubmitting(true);
    setServerMessage({ type: "", text: "" });
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/students/register`,
        { ...formData, admissionDate }
      );
  
      if (response.status === 201) {
        setServerMessage({ type: "success", text: "Student registered successfully!" });
  
        // Reset form fields
        setFormData({
          name: "",
          address: "",
          gender: "",
          dob: "",
          parentMobile: "",
          studentMobile: "",
          email: "",
          class: "",
          branch: "",
        });
  
        setErrors({});
        setIsSubmitting(false); // ✅ Reset after success
      }
    } catch (error) {
      console.error("Error registering student:", error);
      setServerMessage({ type: "error", text: "Failed to register student. Please try again." });
    } finally {
      setTimeout(() => setIsSubmitting(false), 500); // Small delay for better UX
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-700 p-10 rounded-2xl shadow-xl w-full max-w-5xl"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 text-yellow-400">
          Student Admission Form
        </h1>

        {/* Success/Error Messages */}
        {serverMessage.text && (
          <p className={`text-center mb-4 ${serverMessage.type === "success" ? "text-green-400" : "text-red-400"}`}>
            {serverMessage.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-8 gap-y-6">
          {[
            { name: "name", type: "text" },
            { name: "address", type: "text" },
            { name: "dob", type: "date" },
            { name: "parentMobile", type: "text" },
            { name: "studentMobile", type: "text" },
            { name: "email", type: "email" },
            { name: "branch", type: "text" },
          ].map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex flex-col"
            >
              <label className="block text-sm font-medium capitalize text-yellow-300 mb-2">
                {field.name.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-yellow-400"
                required
              />
              {errors[field.name] && <p className="text-red-400 text-sm mt-1">{errors[field.name]}</p>}
            </motion.div>
          ))}

          {/* Gender Selection */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-yellow-300 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-yellow-400"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
          </div>

          {/* Class Selection */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-yellow-300 mb-2">Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:ring-2 focus:ring-yellow-400"
              required
            >
              <option value="">Select Class</option>
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
            </select>
            {errors.class && <p className="text-red-400 text-sm mt-1">{errors.class}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="col-span-2 w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-3 px-4 rounded-lg font-semibold transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Admission"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentRegistrationForm;
