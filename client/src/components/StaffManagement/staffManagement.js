import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [editStaff, setEditStaff] = useState(null);
  const [deleteStaffId, setDeleteStaffId] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect called");
    if (searchCriteria === "branch" && searchValue) {
      fetchStaffByBranch(searchValue);
    } else {
      fetchStaff();
    }
  }, [searchCriteria, searchValue]);

  const filteredStaff = staff.filter((staff) => {
    console.log("filteredStaff:", staff);
    return staff[searchCriteria] && staff[searchCriteria].toString().toLowerCase().includes(searchValue.toLowerCase());
  });

  const fetchStaff = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/staff");
      const data = await response.json();
      console.log("API Response:", data);
      if (data.error) {
        console.error("API Error:", data.error);
      } else {
        setStaff(data);
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
      alert("Error fetching staff data: " + error.message);
    }
  };

  const fetchStaffByBranch = async (branch) => {
    try {
      const response = await fetch(`http://localhost:5000/api/staff/branch/${branch}`);
      const data = await response.json();
      console.log("Fetched staff data by branch:", data); // Add logging
      setStaff(data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      alert("Error fetching staff data: " + error.message);
    }
  };

  const handleEdit = (staff) => {
    setEditStaff(staff);
  };

  const validate = () => {
    const newErrors = {};
    if (!editStaff.name) newErrors.name = "Name is required.";
    if (!editStaff.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(editStaff.email)) newErrors.email = "Email is invalid.";
    if (!editStaff.branch) newErrors.branch = "Branch is required.";
    if (editStaff.contact && !/^\d{10}$/.test(editStaff.contact)) newErrors.contact = "Mobile must be 10 digits.";
    return newErrors;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const id = editStaff.id;

    // Format join_date to YYYY-MM-DD
    const formattedJoinDate = new Date(editStaff.join_date).toISOString().split('T')[0];

    const formData = {
      name: editStaff.name,
      address: editStaff.address || "",
      contact: editStaff.contact || "",
      email: editStaff.email,
      branch: editStaff.branch,
      join_date: formattedJoinDate,
      designation: editStaff.designation || "",
    };

    try {
      const response = await fetch(`http://localhost:5000/api/staff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update staff");
      }

      fetchStaff(); // Refresh staff list after update
      onClose(); // Close the edit modal
      setTimeout(() => {
        alert("Staff updated successfully!");
        console.log("Staff updated successfully!");
      }, 100); // Alert appears with a small delay

    } catch (error) {
      console.error("Error updating staff:", error);
      alert(`Error updating staff: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (deleteStaffId) {
      try {
        const response = await fetch(`http://localhost:5000/api/staff/${deleteStaffId}`, {
          method: "DELETE",
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to delete staff");
        }

        fetchStaff(); // Refresh staff list after deletion
        setDeleteStaffId(null); // Close the delete modal
        // alert("Staff deleted successfully!");
      } catch (error) {
        console.error("Error deleting staff:", error);
        alert(`Error deleting staff: ${error.message}`);
      }
    }
  };

  const onClose = () => {
    setEditStaff(null);
    setDeleteStaffId(null);
  };

  const handleNewStaff = () => {
    navigate("/staffRegistrationForm");
  };

  const handleDashboard = () => {
    navigate("/admin-dashboard");
  }; 

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-black min-h-screen text-white relative">
      <button
        onClick={handleDashboard}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg border border-white absolute top-4 right-4 transition duration-300"
      >
        Go to Dashboard
      </button>
      <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-500">
        Staff Management
      </h1>

      {/* Search Bars and New Staff Button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <select
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
            className="p-3 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-violet-500"
          >
            <option value="name">Name</option>
            <option value="designation">Designation</option>
            <option value="branch">Branch</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-3 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <button
          onClick={handleNewStaff}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
        >
          New Staff
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-600 text-white p-3 rounded-lg mb-6 text-center shadow-md">
          {successMessage}
        </div>
      )}

      {/* Staff Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse border border-gray-700 bg-gray-800 text-white">
          <thead className="bg-gradient-to-r from-gray-700 to-gray-900 text-violet-300 text-center">
            <tr>
              {["ID", "Name", "Contact", "Designation", "Join Date", "Email", "Address", "Branch", "Action"].map((heading) => (
                <th key={heading} className="p-4 text-left border border-gray-700 text-center">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff.id} className="bg-gray-800 hover:bg-gray-700 transition duration-300">
                <td className="p-4 border text-center">{staff.id}</td>
                <td className="p-4 border text-center">{staff.name}</td>
                <td className="p-4 border text-center">{staff.contact}</td>
                <td className="p-4 border text-center">{staff.designation}</td>
                <td className="p-4 border text-center">{staff.join_date}</td>
                <td className="p-4 border text-center">{staff.email}</td>
                <td className="p-4 border text-center">{staff.address}</td>
                <td className="p-4 border text-center">{staff.branch}</td>
                <td className="p-4 border">
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleEdit(staff)}
                      className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-teal-500 hover:to-green-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDeleteStaffId(staff.id)}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Staff Modal */}
      {editStaff && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-violet-600">Edit Staff</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-1">Name</label>
                <input type="text" placeholder="Name" value={editStaff.name} onChange={(e) => setEditStaff({ ...editStaff, name: e.target.value })} className="p-2 border rounded bg-gray text-black w-full" required />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Address</label>
                <input type="text" placeholder="Address" value={editStaff.address} onChange={(e) => setEditStaff({ ...editStaff, address: e.target.value })} className="p-2 border rounded bg-gray text-black w-full" />
              </div>
              <div>
                <label className="block text-white mb-1">Contact</label>
                <input type="text" placeholder="Mobile" value={editStaff.contact} onChange={(e) => setEditStaff({ ...editStaff, contact: e.target.value })} className="p-2 border rounded bg-gray text-black w-full" />
                {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Email</label>
                <input type="email" placeholder="Email" value={editStaff.email} onChange={(e) => setEditStaff({ ...editStaff, email: e.target.value })} className="p-2 border rounded bg-gray text-black w-full" required />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Branch</label>
                <input type="text" placeholder="Branch" value={editStaff.branch} onChange={(e) => setEditStaff({ ...editStaff, branch: e.target.value })} className="p-2 border rounded bg-gray text-black w-full" required />
                {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Joining Date</label>
                <input type="date" value={editStaff.join_date} onChange={(e) => setEditStaff({ ...editStaff, join_date: e.target.value })} className="p-2 border rounded bg-gray text-black w-full" />
              </div>
              <div>
                <label className="block text-white mb-1">Designation</label>
                <input type="text" placeholder="Designation" value={editStaff.designation} onChange={(e) => setEditStaff({ ...editStaff, designation: e.target.value })} className="p-2 border rounded bg-gray text-black w-full" />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Update
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteStaffId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-violet-600">Confirm Delete</h2>
            <p className="mb-4 text-white">Are you sure you want to delete this staff?</p>
            <div className="flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StaffManagement;
