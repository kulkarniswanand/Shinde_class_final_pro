import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateBranch() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updatebranch/`);
      if (!response.ok) throw new Error("Failed to fetch branches.");
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const validate = () => {
    if (!selectedBranch) return false;
    const newErrors = {};
    if (!selectedBranch.name?.trim()) newErrors.name = "Branch name is required.";
    if (!selectedBranch.location?.trim()) newErrors.location = "Location is required.";
    if (!selectedBranch.username?.trim()) newErrors.username = "Username is required.";
    if (!selectedBranch.password?.trim()) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (branch) => {
    setSelectedBranch({ ...branch });
    setErrors({});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updatebranch/${selectedBranch.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedBranch),
      });

      if (!response.ok) throw new Error("Failed to update branch.");

      toast.success("Branch Updated Successfully! 🎉");
      setSelectedBranch(null);
      fetchBranches();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating the branch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700">
      {!selectedBranch ? (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Manage Branches</h2>
          <table className="w-full text-left text-gray-300 border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3">Branch ID</th>
                <th className="p-3">Branch Name</th>
                <th className="p-3">Location</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.id} className="hover:bg-gray-700 border-t border-gray-700">
                  <td className="p-3">{branch.id}</td>
                  <td className="p-3">{branch.name}</td>
                  <td className="p-3">{branch.location}</td>
                  <td className="p-3">
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
            <label className="block text-gray-400">Branch Name</label>
            <input
              type="text"
              value={selectedBranch.name}
              onChange={(e) => setSelectedBranch({ ...selectedBranch, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 border-gray-700 focus:ring focus:ring-blue-500"
              placeholder="Enter branch name"
            />
          </div>

          <div>
            <label className="block text-gray-400">Location</label>
            <input
              type="text"
              value={selectedBranch.location}
              onChange={(e) => setSelectedBranch({ ...selectedBranch, location: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 border-gray-700 focus:ring focus:ring-blue-500"
              placeholder="Enter location"
            />
          </div>
          <div>
            <label className="block text-gray-400">Username</label>
            <input
              type="text"
              value={selectedBranch.username}
              onChange={(e) => setSelectedBranch({ ...selectedBranch, username: e.target.value })}
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-100 border-gray-700 focus:ring focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-400">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={selectedBranch.password}
                onChange={(e) => setSelectedBranch({ ...selectedBranch, password: e.target.value })}
                className="w-full p-3 pr-10 rounded-lg bg-gray-800 text-gray-100 border-gray-700 focus:ring focus:ring-blue-500"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Branch"}
            </button>
            <button
              type="button"
              className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-md transition-all"
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
