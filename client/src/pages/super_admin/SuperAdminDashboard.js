import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageBranches from "../../components/Super_Admin/MainContentDashboard";

const SuperAdminDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Replace these with real API calls or props in the future
  const dashboardStats = []; // No dummy data
  const graphData = []; // No dummy data

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear auth tokens)
    alert("Logged out!");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-800 to-blue-600 shadow-lg">
        <div className="flex items-center gap-4">
          <span className="bg-white text-blue-700 font-bold rounded-full px-4 py-2 text-2xl shadow-lg">
            SA
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-lg">
            Super Admin Dashboard
          </h1>
        </div>
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="flex items-center gap-2 text-white bg-blue-500 px-5 py-2 rounded-xl shadow-md hover:bg-blue-600 transition-all font-semibold"
          >
            <span className="material-icons">account_circle</span>
            SuperAdmin
            <svg
              className={`w-4 h-4 ml-1 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg w-44 z-20">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-t-md"
              >
                Logout
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded-b-md"
              >
                Profile
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Dashboard Summary Cards */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        {dashboardStats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {dashboardStats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`rounded-2xl shadow-lg p-6 flex flex-col items-center ${stat.color} bg-opacity-90 hover:scale-105 transition-transform`}
              >
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Graph Section */}
        {graphData.length > 0 && (
          <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 mb-10">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Monthly Growth
            </h2>
            <div className="w-full h-56 flex items-end">
              {/* Simple SVG Bar Chart */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 320 180"
                className="w-full h-full"
              >
                {graphData.map((d, i) => {
                  const barWidth = 40;
                  const gap = 20;
                  const x = i * (barWidth + gap) + 30;
                  const barHeight = (d.value / 100) * 120;
                  return (
                    <g key={d.label}>
                      <rect
                        x={x}
                        y={150 - barHeight}
                        width={barWidth}
                        height={barHeight}
                        rx="8"
                        fill="#2563eb"
                        className="transition-all duration-300"
                      />
                      <text
                        x={x + barWidth / 2}
                        y={160}
                        textAnchor="middle"
                        fontSize="14"
                        fill="#1e293b"
                      >
                        {d.label}
                      </text>
                      <text
                        x={x + barWidth / 2}
                        y={150 - barHeight - 8}
                        textAnchor="middle"
                        fontSize="13"
                        fill="#2563eb"
                        fontWeight="bold"
                      >
                        {d.value}
                      </text>
                    </g>
                  );
                })}
                {/* Y axis line */}
                <line
                  x1="20"
                  y1="10"
                  x2="20"
                  y2="150"
                  stroke="#64748b"
                  strokeWidth="2"
                />
                {/* X axis line */}
                <line
                  x1="20"
                  y1="150"
                  x2="310"
                  y2="150"
                  stroke="#64748b"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8">
          <ManageBranches />
        </div>
      </section>
    </div>
  );
};

export default SuperAdminDashboard;
