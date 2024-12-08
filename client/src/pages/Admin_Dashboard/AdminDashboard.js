import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const dashboardOptions = [
  { id: 1, name: "Student Registration", image: "/images/Dashboard/student_registration.jpeg", route: "/student-registration" },
  { id: 2, name: "Fees Management", image: "/images/Dashboard/Fees Management.jpg", route: "/fees-management" },
  { id: 3, name: "Student Details", image: "/images/Dashboard/Student Details.jpg", route: "/student-details" },
  { id: 4, name: "Attendance", image: "/images/Dashboard/Attendance.jpg", route: "/attendance" },
  { id: 5, name: "Exam Schedule", image: "/images/Dashboard/Exam Schedule.jpg", route: "/exam-schedule" },
  { id: 6, name: "Staff Management", image: "/images/Dashboard/Staff Management.jpg", route: "/staff-management" },
  { id: 7, name: "Certificates", image: "/images/Dashboard/Certificates.jpg", route: "/certificates" },
  { id: 8, name: "Exam Marks", image: "/images/Dashboard/Exam Marks.jpg", route: "/exam-marks" },
  { id: 9, name: "Results", image: "/images/Dashboard/Results.jpg", route: "/results" },
];

const AdminDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  // Toggle theme handler
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300"
      } py-10 transition-colors duration-300`}
    >
      {/* Theme Toggle Button */}
      <div className="text-right px-10">
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-full font-semibold ${
            isDarkMode
              ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
              : "bg-gray-800 text-gray-100 hover:bg-gray-900"
          } transition-all duration-300`}
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>

      {/* Title */}
      <h1
        className={`text-center text-4xl font-extrabold mb-12 tracking-wide ${
          isDarkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Admin Dashboard
      </h1>

      {/* Dashboard Options */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {dashboardOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => navigate(option.route)}
            className={`flex flex-col items-center justify-center ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg rounded-xl p-6 hover:scale-105 transition-transform hover:shadow-xl cursor-pointer`}
          >
            <img
              src={option.image}
              alt={option.name}
              className="w-20 h-20 object-contain mb-5 rounded-full border-4 border-gray-600"
            />
            <p
              className={`text-center text-lg font-semibold ${
                isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-800 hover:text-gray-600"
              }`}
            >
              {option.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
