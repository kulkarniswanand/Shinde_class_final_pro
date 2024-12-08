import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // React Router navigation hook

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`Login successful as ${data.role}`);
        switch (data.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "user":
            navigate("/user-dashboard");
            break;
          case "student":
            navigate("/student-dashboard");
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
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
          Welcome Back!
        </h2>
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
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="username" className="block text-gray-600 font-medium">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
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
