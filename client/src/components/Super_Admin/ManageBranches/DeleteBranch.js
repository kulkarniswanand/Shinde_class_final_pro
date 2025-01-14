import React, { useState, useEffect } from "react";

export default function DeleteBranch() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    // Simulate fetching branches from an API
    setBranches([
      { id: 1, name: "Branch 1", location: "Location 1" },
      { id: 2, name: "Branch 2", location: "Location 2" },
    ]);
  }, []);

  const handleDelete = (branch) => {
    setSelectedBranch(branch);
    setConfirmDelete(true);
  };

  const confirmDeletion = () => {
    // Simulate API call to delete branch
    setBranches(branches.filter((branch) => branch.id !== selectedBranch.id));
    alert("Branch deleted successfully!");
    setConfirmDelete(false);
    setSelectedBranch(null);
  };

  const cancelDeletion = () => {
    setConfirmDelete(false);
    setSelectedBranch(null);
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
      {!confirmDelete ? (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Manage Branches</h2>
          <table className="w-full text-left text-gray-300 border-collapse border border-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-700 p-3">Branch ID</th>
                <th className="border border-gray-700 p-3">Branch Name</th>
                <th className="border border-gray-700 p-3">Location</th>
                <th className="border border-gray-700 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.id} className="hover:bg-gray-700">
                  <td className="border border-gray-700 p-3">{branch.id}</td>
                  <td className="border border-gray-700 p-3">{branch.name}</td>
                  <td className="border border-gray-700 p-3">{branch.location}</td>
                  <td className="border border-gray-700 p-3">
                    <button
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all"
                      onClick={() => handleDelete(branch)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-4">
            Are you sure you want to delete the branch: {selectedBranch.name}?
          </h3>
          <div className="flex justify-center space-x-4">
            <button
              className="py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all"
              onClick={confirmDeletion}
            >
              Yes, Delete
            </button>
            <button
              className="py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
              onClick={cancelDeletion}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
