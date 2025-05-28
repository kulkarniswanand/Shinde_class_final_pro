import React, { useState, useEffect } from "react";

export default function DeleteBranch() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const branchesPerPage = 5;

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/deletebranch/`); // Update if your endpoint is different
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  // Pagination logic
  const indexOfLastBranch = currentPage * branchesPerPage;
  const indexOfFirstBranch = indexOfLastBranch - branchesPerPage;
  const currentBranches = branches.slice(indexOfFirstBranch, indexOfLastBranch);
  const totalPages = Math.ceil(branches.length / branchesPerPage);

  const handleDelete = (branch) => {
    setSelectedBranch(branch);
    setConfirmDelete(true);
  };

  const confirmDeletion = async () => {
    if (!selectedBranch) return;

    try {
      const response=await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/deletebranch/${selectedBranch.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBranches(branches.filter((branch) => branch.id !== selectedBranch.id));
        alert("Branch deleted successfully!");
      } else {
        alert("Failed to delete branch!");
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
      alert("Error deleting branch!");
    }

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
              {currentBranches.map((branch) => (
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
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                className={`px-3 py-1 rounded ${currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
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
