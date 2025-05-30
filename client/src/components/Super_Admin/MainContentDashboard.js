import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const superAdminOptions = [
  { id: 1, name: "Manage Branches", image: "/images/SuperAdmin/ManageBranches.jpeg", route: "/ManageBranches" },
];

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalFees: 0,
    remainingFees: 0,
    collectedFees: 0,
  });

  useEffect(() => {
    // Fetch dashboard data from backend
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/dashboard`, {
          method: "GET", // Use GET if POST is not required
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log("Dashboard Data:", data); // Log the response to verify structure
        setDashboardData({
          totalStudents: data.totalStudents || 0,
          totalFees: data.totalFees || 0,
          remainingFees: data.remainingFees || 0,
          collectedFees: data.collectedFees || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-100 tracking-wide drop-shadow-lg">
          Super Admin Dashboard
        </h1>
      </header>

      {/* Dashboard Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 max-w-6xl">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-100">Total Students</h2>
          <p className="text-xl text-gray-300 mt-2">{dashboardData.totalStudents || 0}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-100">Total Fees</h2>
          <p className="text-xl text-gray-300 mt-2">₹{dashboardData.totalFees || 0}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-100">Remaining Fees</h2>
          <p className="text-xl text-gray-300 mt-2">₹{dashboardData.remainingFees || 0}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-gray-100">Collected Fees</h2>
          <p className="text-xl text-gray-300 mt-2">₹{dashboardData.collectedFees || 0}</p>
        </div>
      </div>

      {/* Dashboard Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
        {superAdminOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => navigate(option.route)}
            className="group relative flex flex-col items-center justify-center bg-gray-800 bg-opacity-90 shadow-xl rounded-xl p-8 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer backdrop-blur-lg border border-gray-700"
          >
            {/* Image */}
            <div className="w-24 h-24 flex items-center justify-center bg-gray-700 rounded-full shadow-md transition-all group-hover:bg-gray-600">
              <img
                src={option.image}
                alt={option.name}
                className="w-20 h-20 object-cover rounded-full border-4 border-gray-500 transition-transform group-hover:scale-110"
              />
            </div>

            {/* Option Name */}
            <p className="mt-5 text-xl font-semibold text-gray-300 group-hover:text-gray-100 transition-all">
              {option.name}
            </p>

            {/* Hover Overlay Effect */}
            <div className="absolute inset-0 bg-gray-900 bg-opacity-40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
