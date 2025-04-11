import React, { useState, useEffect } from "react";
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
  const [branches, setBranches] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchBranches();
  }, []);

  // Validate DOB dynamically when class or dob changes
  useEffect(() => {
    if (formData.dob && formData.class) {
      validateField("dob", formData.dob);
    }
  }, [formData.dob, formData.class]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "name":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          message = "Name must contain only alphabets and spaces.";
        }
        break;

      case "address":
        if (value.trim().length < 10) {
          message = "Address must be at least 10 characters long.";
        }
        break;

        case "dob":
          const today = new Date();
          const dob = new Date(value);
          let age = today.getFullYear() - dob.getFullYear();
          const monthDiff = today.getMonth() - dob.getMonth();
          const dayDiff = today.getDate() - dob.getDate();
        
          // Adjust age if the birthday hasn't occurred yet this year
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
          }
        
          // Validate age based on the selected class with exact age criteria
          if (formData.class === "8th" && age !== 12) {
            message = "For 8th class, the student must be exactly 12 years old.";
          } else if (formData.class === "9th" && age !== 13) {
            message = "For 9th class, the student must be exactly 13 years old.";
          } else if (formData.class === "10th" && age !== 14) {
            message = "For 10th class, the student must be exactly 14 years old.";
          } else if (dob > today) {
            message = "Date of birth cannot be in the future.";
          }
          break;
        

      case "parentMobile":
      case "studentMobile":
        if (value && !/^\d{10}$/.test(value)) {
          message = "Mobile number must be exactly 10 digits.";
        }
        break;

      case "email":
        if (value && !/^\S+@\S+\.\S+$/.test(value)) {
          message = "Invalid email address.";
        }
        break;

      case "class":
        if (!value) {
          message = "Class is required.";
        }
        break;

      case "branch":
        if (!value) {
          message = "Branch is required.";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
      if (!formData[key].trim() && key !== "studentMobile" && key !== "email") {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!window.confirm("Are you sure you want to submit this form?")) return;

    setIsSubmitting(true);
    setServerMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/students/register`,
        {
          ...formData,
          admissionDate,
        }
      );

      if (response.status === 201) {
        setServerMessage({
          type: "success",
          text: "Student registered successfully!",
        });
        alert("Student registered successfully!"); // Alert message on successful submission
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
      }
    } catch (error) {
      console.error("Error registering student:", error);
      setServerMessage({
        type: "error",
        text: "Failed to register student. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/updatebranch`
      );
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6 py-10">
      <motion.div className="bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Student Admission Form
        </h1>
        {serverMessage.text && (
          <p
            className={`text-center mb-4 ${
              serverMessage.type === "success"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {serverMessage.text}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {[ "name", "address", "dob", "parentMobile", "studentMobile", "email" ].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-sm font-medium text-blue-300 capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field === "dob" ? "date" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              {errors[field] && (
                <p className="text-red-400 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div className="flex flex-col">
            <label className="text-sm font-medium text-blue-300">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-400 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-blue-300">Class</label>
            <select
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Class</option>
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
            </select>
            {errors.class && (
              <p className="text-red-400 text-sm mt-1">{errors.class}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-blue-300">Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Branch</option>
              {branches.map((branch, index) => (
                <option key={branch.id || index} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
            {errors.branch && (
              <p className="text-red-400 text-sm mt-1">{errors.branch}</p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="col-span-2 w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-3 px-4 rounded-lg font-semibold transition-all duration-300"
            disabled={isSubmitting}
          >
            Submit Admission
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentRegistrationForm;