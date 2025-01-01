import React, { useState } from "react";
import AddBranch from "./AddBranch";
import UpdateBranch from "./UpdateBranch";
import DeleteBranch from "./DeleteBranch"

export default function Navbar() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  };

  return (
    <div className="h=screen bg-gray-900 text-white p-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-8">Super Admin Dashboard</h1>

      {/* Buttons */}
      <div className="flex justify-center space-x-6 mb-10">
        <button
          onClick={() => handleButtonClick("addBranch")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-md transition-all"
        >
          Add Branch
        </button>
        <button
          onClick={() => handleButtonClick("updateBranch")}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold shadow-md transition-all"
        >
          Update Branch
        </button>
        <button
          onClick={() => handleButtonClick("deleteBranch")}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold shadow-md transition-all"
        >
          Delete Branch
        </button>
      </div>

      {/* Render Components */}
      <div className="mt-10">
        {activeComponent === "addBranch" && <AddBranch />}
        {activeComponent === "updateBranch" && <UpdateBranch />}
        {activeComponent === "deleteBranch" && <DeleteBranch />}
      </div>
    </div>
  );
}
