import React from "react";
import { useNavigate } from "react-router-dom";

const superAdminOptions = [
  { id: 1, name: "Manage Branches", image: "/images/SuperAdmin/ManageBranches.jpeg", route: "/ManageBranches" },
];

const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-100 tracking-wide drop-shadow-lg">
          Super Admin Dashboard
        </h1>
      </header>

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
