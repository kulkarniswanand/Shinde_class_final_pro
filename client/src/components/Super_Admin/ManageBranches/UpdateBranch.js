import React, { useState, useEffect } from "react";

export default function UpdateBranch() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Simulated fetch branches from API
    setBranches([
      { id: 1, name: "Branch 1", location: "Location 1", username: "branch1", password: "password1" },
      { id: 2, name: "Branch 2", location: "Location 2", username: "branch2", password: "password2" },
    ]);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!selectedBranch.name.trim()) newErrors.name = "Branch name is required.";
    if (!selectedBranch.location.trim()) newErrors.location = "Location is required.";
    if (!selectedBranch.username.trim()) newErrors.username = "Username is required.";
    if (!selectedBranch.password.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setErrors({});
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Simulate API call to update branch
    console.log("Updated Branch", selectedBranch);
    alert("Branch Updated Successfully!");
    setSelectedBranch(null);
    setErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
      {!selectedBranch ? (
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
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition-all"
                      onClick={() => handleEdit(branch)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Edit Branch</h2>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Branch Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={selectedBranch.name}
              onChange={(e) => setSelectedBranch({ ...selectedBranch, name: e.target.value })}
              className={`w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring ${
                errors.name ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter branch name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={selectedBranch.location}
              onChange={(e) => setSelectedBranch({ ...selectedBranch, location: e.target.value })}
              className={`w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring ${
                errors.location ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter location"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={selectedBranch.username}
              onChange={(e) => setSelectedBranch({ ...selectedBranch, username: e.target.value })}
              className={`w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring ${
                errors.username ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter username"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={selectedBranch.password}
              onChange={(e) => setSelectedBranch({ ...selectedBranch, password: e.target.value })}
              className={`w-full p-3 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring ${
                errors.password ? "border-red-500" : "border-gray-600"
              }`}
              placeholder="Enter password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all"
            >
              Update Branch
            </button>
            <button
              type="button"
              className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-all"
              onClick={() => setSelectedBranch(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
