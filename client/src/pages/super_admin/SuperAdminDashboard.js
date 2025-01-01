import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageBranches from "../../components/Super_Admin/MainContentDashboard";

const SuperAdminDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear auth tokens)
    alert("Logged out!");
    navigate("/home"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-gray-800 shadow-md">
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        <div className="relative">
          {/* Logged in status */}
          <button
            onClick={handleDropdownToggle}
            className="text-white bg-blue-500 px-4 py-2 rounded-lg focus:outline-none"
          >
            SuperAdmin Logged In
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded-md shadow-lg w-40">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-10">
        <ManageBranches />
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
