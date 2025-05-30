import React, { useEffect, useState } from "react";
import useBranches from "../../hooks/useBranches"; // adjust path as needed
import CircularNav from "../CircularNav/CircularNav"; // Import CircularNav

export default function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ className: "", branchId: "", year: "" });
  const [editId, setEditId] = useState(null);

  const { branches, loading: branchesLoading } = useBranches(); // ✅ Use custom hook here

  const fetchClasses = async () => { 
    try {
      console.log("Fetching classes..."); // Debug log
      const resClasses = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getclass`); // Ensure this endpoint fetches all classes
      if (resClasses.ok) {
        const dataClasses = await resClasses.json();
        console.log("Fetched classes:", dataClasses); // Debug log
        setClasses(Array.isArray(dataClasses.data) ? dataClasses.data : []); // Update the state with fetched classes
      } else {
        console.error("Failed to fetch classes. Status:", resClasses.status);
        setClasses([]); // Clear the state if fetching fails
      }
    } catch (error) {
      console.error("Error fetching classes:", error); // Log network errors
      setClasses([]); // Clear the state in case of an error
    }
  };

  useEffect(() => {
    fetchClasses(); // Fetch classes when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/classes${editId ? `/${editId}` : ""}`;

    console.log(`Submitting form to ${url} with method ${method}`); // Debug log
    console.log("Form data:", form); // Debug log

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      console.log("Server response status:", res.status); // Debug log for response status

      if (res.ok) {
        const responseData = await res.json(); // Parse the response
        console.log("Server response data:", responseData); // Debug log for response data
        alert(editId ? "Class updated successfully!" : "Class added successfully!"); // Alert message
        setForm({ className: "", branchId: "", year: "" });
        setEditId(null);
        fetchClasses(); // Ensure classes are fetched after submission
      } else {
        console.error("Failed to submit form. Status:", res.status);
        const errorData = await res.json();
        console.error("Error details:", errorData); // Debug log for error details
      }
    } catch (error) {
      console.error("Error submitting form:", error); // Log network errors
    }
  };

  const handleEdit = (cls) => {
    setForm({ className: cls.className, branchId: cls.branchId, year: cls.year });
    setEditId(cls.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/classes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchClasses();
      } else {
        console.error("Failed to delete class");
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-200 dark:bg-gray-900 bg-gray-100 rounded-xl shadow-md">
      <CircularNav /> {/* Add CircularNav component */}
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-500 dark:text-indigo-400">Class Management</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          name="className"
          value={form.className}
          onChange={handleChange}
          placeholder="Enter class name (e.g., 8th)"
          className="p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          required
        />

        <select
          name="branchId"
          value={form.branchId}
          onChange={handleChange}
          className="p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          required
        >
          <option value="">Select Branch</option>
          {branchesLoading ? (
            <option disabled>Loading branches...</option>
          ) : branches.length > 0 ? (
            branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name}
              </option>
            ))
          ) : (
            <option disabled>No branches available</option>
          )}
        </select>

        <input
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Academic Year (e.g., 2024-2025)"
          className="p-2 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          required
        />

        <button
          type="submit"
          className="md:col-span-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
        >
          {editId ? "Update Class" : "Add Class"}
        </button>
      </form>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-indigo-800 text-white">
            <th className="p-3">ID</th>
            <th className="p-3">Class</th>
            <th className="p-3">Branch</th>
            <th className="p-3">Year</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.length > 0 ? (
            classes.map((cls) => (
              <tr key={cls.id} className="border-b border-gray-700 hover:bg-gray-900">
                <td className="p-3">{cls.id}</td>
                <td className="p-3">{cls.className}</td>
                <td className="p-3">{cls.branchName || cls.branchId}</td>
                <td className="p-3">{cls.year}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(cls)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cls.id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-3 text-center">
                No classes available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
