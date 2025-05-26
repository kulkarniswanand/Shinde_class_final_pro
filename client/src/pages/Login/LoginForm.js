import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [studentName, setStudentName] = useState(""); // Added state for student name
  const [errors, setErrors] = useState({}); // State for validation errors
  const navigate = useNavigate(); // React Router navigation hook  

  const validateForm = () => {
    const newErrors = {};
    // Student Name validation (only if role is student)
    if (role === "student") {
      if (!studentName.trim()) {
        newErrors.studentName = "Student Name is required.";
      } else {
        const nameParts = studentName.trim().split(/\s+/);
        const isCapitalized = nameParts.every(
          (part) => part.length > 0 && part[0] === part[0].toUpperCase()
        );
        if (!isCapitalized) {
          newErrors.studentName = "First letter of name and surname must be capital.";
        }
      }
    }
    // Username validation
    if (!username.trim()) {
      newErrors.username = "Username is required.";
    }
 

    // Password validation
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          role === "student"
            ? { role, username, password, studentName }
            : { role, username, password }
        ),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Login successful as ${data.role}`);

        // Store username in localStorage
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(role === "student" ? { username, studentName } : { username })
        );

        switch (data.role) {
          case "superadmin":
            navigate("/superadmindashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "user":
            navigate("/user-dashboard");
            break;
          case "student":
            navigate("/StudentDashboard");
            break;
          default:
            alert("Unknown role received.");
        }
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">Welcome Back!</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="role" className="block text-gray-600 font-medium">
              Login As:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              {/* <option value="user">User</option> */}
              <option value="student">Student</option>
            </select>
          </div>
          {role === "student" && (
            <div className="mb-5">
              <label htmlFor="studentName" className="block text-gray-600 font-medium">
                Student Name:
              </label>
              <input
                type="text"
                id="studentName"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  if (errors.studentName) setErrors(prev => ({ ...prev, studentName: null }));
                }}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your full name"
                // 'required' attribute is good for browser-level, but JS validation is more robust
              />
              {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>}
            </div>
          )}
          <div className="mb-5">
            <label htmlFor="username" className="block text-gray-600 font-medium">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors(prev => ({ ...prev, username: null }));
              }}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              required
            />
            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
          </div>
          {/* Changed mb-6 to mb-5 for consistency */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({ ...prev, password: null }));
              }}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-md shadow-md hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-gray-600 text-sm text-center">
          Forgot your password?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Reset it here.
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
