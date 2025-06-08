import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

// Password reset form component
function PasswordResetForm({ onBack }) {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!username.trim()) errs.username = "Username is required.";
    if (newPassword.length < 6) errs.newPassword = "Password must be at least 6 characters.";
    if (newPassword !== confirmPassword) errs.confirmPassword = "Passwords do not match.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          newPassword,
          role: "user", // or "student" if you want to support student reset here
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful.");
      } else {
        setMessage(data.message || "Password reset failed.");
      }
    } catch (err) {
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all hover:scale-105">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="reset-username" className="block text-gray-600 font-medium">
            Username:
          </label>
          <input
            type="text"
            id="reset-username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>
        <div className="mb-5">
          <label htmlFor="reset-password" className="block text-gray-600 font-medium">
            New Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="reset-password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-16"
              placeholder="Enter new password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-blue-600 bg-transparent border-none focus:outline-none"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={0}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
        </div>
        <div className="mb-5">
          <label htmlFor="reset-confirm" className="block text-gray-600 font-medium">
            Confirm Password:
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              id="reset-confirm"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-16"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-blue-600 bg-transparent border-none focus:outline-none"
              onClick={() => setShowConfirm(v => !v)}
              tabIndex={0}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-md shadow-md hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        <button
          type="button"
          className="w-full mt-3 px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
          onClick={onBack}
        >
          Back to Login
        </button>
        {message && <p className="text-green-600 text-sm mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}

const LoginForm = () => {
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [studentName, setStudentName] = useState(""); // Added state for student name
  const [errors, setErrors] = useState({}); // State for validation errors
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showReset, setShowReset] = useState(false);
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
      {showReset ? (
        <PasswordResetForm onBack={() => setShowReset(false)} />
      ) : (
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                  }}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={0}
                  role="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
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
            <button
              type="button"
              className="text-blue-500 hover:underline bg-transparent border-none p-0 m-0"
              onClick={() => setShowReset(true)}
            >
              Reset it here.
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
