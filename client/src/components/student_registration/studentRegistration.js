import React, { useState } from "react";
import axios from "axios";

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

  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});
  const [admissionDate] = useState(new Date().toISOString().split("T")[0]); // Today's date

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      calculateAge(value);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge || "");
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("/api/students/register", {
        ...formData,
        admissionDate,
      });
      alert("Student registered successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error registering student:", error);
      alert("Failed to register student.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 to-indigo-600 text-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-2xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Student Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.address ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            ></textarea>
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.gender ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.dob ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>

          {/* Parent's Mobile */}
          <div>
            <label htmlFor="parentMobile" className="block text-sm font-medium">
              Parent's Mobile
            </label>
            <input
              type="text"
              id="parentMobile"
              name="parentMobile"
              value={formData.parentMobile}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.parentMobile ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {errors.parentMobile && <p className="text-red-500 text-sm mt-1">{errors.parentMobile}</p>}
          </div>

          {/* Student's Mobile */}
          <div>
            <label htmlFor="studentMobile" className="block text-sm font-medium">
              Student's Mobile (Optional)
            </label>
            <input
              type="text"
              id="studentMobile"
              name="studentMobile"
              value={formData.studentMobile}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.studentMobile ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.studentMobile && <p className="text-red-500 text-sm mt-1">{errors.studentMobile}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Class */}
          <div>
            <label htmlFor="class" className="block text-sm font-medium">
              Class
            </label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.class ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            >
              <option value="">Select Class</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
            </select>
            {errors.class && <p className="text-red-500 text-sm mt-1">{errors.class}</p>}
          </div>

          {/* Branch */}
          <div>
            <label htmlFor="branch" className="block text-sm font-medium">
              Branch
            </label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-gray-700 border ${
                errors.branch ? "border-red-500" : "border-gray-600"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
              required
            />
            {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-violet-700 hover:bg-violet-900 text-white py-2 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Register Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
