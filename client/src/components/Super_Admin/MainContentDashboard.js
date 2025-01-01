import React from "react";
import { useNavigate } from "react-router-dom";

const superAdminOptions = [
  { id: 1, name: "Manage Branches", image: "/images/SuperAdmin/ManageBranches.jpeg", route: "/manage-branches" },
];

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-10">
      {/* Header */}
      <header className="flex justify-center">
        <h1 className="text-3xl font-bold text-gray-100">Super Admin Dashboard</h1>
      </header>

      {/* Dashboard Options */}
      <div className="mt-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {superAdminOptions.map((option) => (
          <div
            key={option.id}
            onClick={() => navigate("/ManageBranches")}
            className="flex flex-col items-center justify-center bg-gray-800 shadow-lg rounded-xl p-6 hover:scale-105 transition-transform hover:shadow-xl cursor-pointer"
          >
            <img
              src={option.image}
              alt={option.name}
              className="w-20 h-20 object-contain mb-5 rounded-full border-4 border-gray-600"
            />
            <p className="text-center text-lg font-semibold text-gray-300 hover:text-gray-100">{option.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
