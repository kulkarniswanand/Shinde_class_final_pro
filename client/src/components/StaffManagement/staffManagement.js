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

  
  // ... rest of your code ...
  const handleEdit = (staff) => {
    setEditStaff(staff);
  };

  const validate = () => {
    const newErrors = {};
    if (!editStaff.staffname) newErrors.staffname = "Name is required.";
    if (!editStaff.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(editStaff.email)) newErrors.email = "Email is invalid.";
    if (!editStaff.branch) newErrors.branch = "Branch is required.";
    if (editStaff.mobile && !/^\d{10}$/.test(editStaff.mobile)) newErrors.mobile = "Mobile must be 10 digits.";
    return newErrors;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Update button clicked"); // Add logging
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log("Validation errors:", newErrors); // Add logging
      return;
    }

    const id = editStaff.id;

    // Format join_date to YYYY-MM-DD
    const formattedJoinDate = new Date(editStaff.join_date).toISOString().split('T')[0];

    const formData = {
      staffname: editStaff.staffname,
      address: editStaff.address || "",
      contact: editStaff.contact || "",
      email: editStaff.email,
      branch: editStaff.branch,
      join_date: formattedJoinDate,
    };

    try {
      console.log("Sending update request with data:", formData); // Add logging
      const response = await fetch(`http://localhost:5000/api/staff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update staff");
      }

      console.log("Update successful:", result); // Add logging
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

  // const filteredStaff = staff.filter((staff) => {
  //   return staff[searchCriteria] && staff[searchCriteria].toString().toLowerCase().includes(searchValue.toLowerCase());
  // });

  //??

  const handleNewStaff = () => {
    navigate("/staffRegistrationForm");
  };

  return (
    <div className="container mx-auto p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-violet-600">Staff Management</h1>

      {/* Search Bars and New Staff Button */}
      <div className="flex justify-between mb-6">
        <div className="flex">
          <select
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
            className="p-2 border rounded bg-gray text-black mr-2"
          >
            <option value="staffname">Name</option>
            <option value="subject">Subject</option>
            <option value="branch">Branch</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-2 border rounded bg-gray text-black"
          />
        </div>
        <button
          onClick={handleNewStaff}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Staff
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
          {successMessage}
        </div>
      )}

      {/* Staff Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white">
          <thead className="bg-gray-800 text-violet-300 text-center">
            <tr>
              {["ID", "Name", "Contact", "Designation", "Join Date", "Email", "Address", "Branch", "Action"].map((heading) => (
                <th key={heading} className="p-3 text-left border border-gray-300 text-center">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff.id} className="bg-black hover:bg-gray-900">
                <td className="p-3 border text-center">{staff.id}</td>
                <td className="p-3 border text-center">{staff.name}</td>
                <td className="p-3 border text-center">{staff.contact}</td>
                <td className="p-3 border text-center">{staff.designation}</td>
                <td className="p-3 border text-center">{staff.join_date}</td>
                <td className="p-3 border text-center">{staff.email}</td>
                <td className="p-3 border text-center">{staff.address}</td>
                <td className="p-3 border text-center">{staff.branch}</td>
                <td className="p-3 border">
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleEdit(staff)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDeleteStaffId(staff.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
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
                <input type="text" placeholder="Name" value={editStaff.name} onChange={(e) => setEditStaff({ ...editStaff, name: e.target.value })} className="p-2 border rounded bg-gray text-black" required />
                {errors.staffname && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Address</label>
                <input type="text" placeholder="Address" value={editStaff.address} onChange={(e) => setEditStaff({ ...editStaff, address: e.target.value })} className="p-2 border rounded bg-gray text-black" />
              </div>
              <div>
                <label className="block text-white mb-1">Contact</label>
                <input type="text" placeholder="Mobile" value={editStaff.contact} onChange={(e) => setEditStaff({ ...editStaff, contact: e.target.value })} className="p-2 border rounded bg-gray text-black" />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.contact}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Email</label>
                <input type="email" placeholder="Email" value={editStaff.email} onChange={(e) => setEditStaff({ ...editStaff, email: e.target.value })} className="p-2 border rounded bg-gray text-black" required />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Branch</label>
                <input type="text" placeholder="Branch" value={editStaff.branch} onChange={(e) => setEditStaff({ ...editStaff, branch: e.target.value })} className="p-2 border rounded bg-gray text-black" required />
                {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Joining Date</label>
                <input type="date" value={editStaff.join_date} onChange={(e) => setEditStaff({ ...editStaff, join_date: e.target.value })} className="p-2 border rounded bg-gray text-black" />
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
