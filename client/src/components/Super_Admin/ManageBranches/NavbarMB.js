import React, { useState } from "react";
import { Home, Plus, Edit, Trash2, LayoutDashboard } from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom";
import AddBranch from "./AddBranch";
import UpdateBranch from "./UpdateBranch";
import DeleteBranch from "./DeleteBranch";

export default function Navbar() {
  const [activeComponent, setActiveComponent] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col justify-between shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-center mb-6">Super Admin</h1>

          <nav className="flex flex-col space-y-4">
            <button
              onClick={() => handleButtonClick("addBranch")}
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                activeComponent === "addBranch"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <Plus className="w-5 h-5 mr-3" />
              Add Branch
            </button>

            <button
              onClick={() => handleButtonClick("updateBranch")}
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                activeComponent === "updateBranch"
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <Edit className="w-5 h-5 mr-3" />
              Update Branch
            </button>

            <button
              onClick={() => handleButtonClick("deleteBranch")}
              className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                activeComponent === "deleteBranch"
                  ? "bg-red-600 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <Trash2 className="w-5 h-5 mr-3" />
              Delete Branch
            </button>
          </nav>
        </div>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate("/superadmindashboard")}
          className="flex items-center px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Back to Dashboard
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10">
        {activeComponent === null && (
          <div className="text-center text-gray-400">
            <Home className="w-16 h-16 mx-auto mb-4" />
            <p>Select an option from the sidebar</p>
          </div>
        )}
        {activeComponent === "addBranch" && <AddBranch />}
        {activeComponent === "updateBranch" && <UpdateBranch />}
        {activeComponent === "deleteBranch" && <DeleteBranch />}
      </div>
    </div>
  );
}