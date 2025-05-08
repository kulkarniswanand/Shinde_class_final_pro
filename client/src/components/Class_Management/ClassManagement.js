import React, { useEffect, useState } from "react";

export default function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({ className: "", branchId: "", year: "" });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      // Fetch classes
      const resClasses = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/getclass`);
      if (resClasses.ok) {
        const dataClasses = await resClasses.json();
        console.log("Fetched classes:", dataClasses); // Debug fetched classes
        if (Array.isArray(dataClasses)) {
          setClasses(dataClasses); // Ensure classes is an array
        } else {
          console.error("Unexpected classes data format:", dataClasses);
          setClasses([]);
        }
      } else {
        console.error("Failed to fetch classes");
        setClasses([]);
      }

      // Fetch branches
      const resBranches = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/updatebranch`);
      if (resBranches.ok) {
        const dataBranches = await resBranches.json();
        console.log("Fetched branches:", dataBranches); // Debug fetched branches
        if (Array.isArray(dataBranches)) {
          setBranches(dataBranches); // Ensure branches is an array
        } else {
          console.error("Unexpected branches data format:", dataBranches);
          setBranches([]);
        }
      } else {
        console.error("Failed to fetch branches");
        setBranches([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setClasses([]);
      setBranches([]);
    }
  };

  useEffect(() => {
    fetchData(); // Switch back to fetching data from the backend
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/classes${editId ? `/${editId}` : ""}`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ className: "", branchId: "", year: "" });
      setEditId(null);
      fetchData();
    }
  };

  const handleEdit = (cls) => {
    setForm({ className: cls.className, branchId: cls.branchId, year: cls.year });
    setEditId(cls.id);
  };

  const handleDelete = async (id) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/classes/${id}`;
    await fetch(url, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-200 dark:bg-gray-900 bg-gray-100 rounded-xl shadow-md">
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
          {branches.length > 0 ? (
            branches.map((branch) => (
              <option key={branch.id} value={branch.id}>
                {branch.name ?? `Branch ${branch.id}`}
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
          className="md:col-span-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
        >
          {editId ? "Update Class" : "Add Class"}
        </button>
      </form>

      <table className="min-w-full bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="py-2 px-4 border">Class</th>
            <th className="py-2 px-4 border">Branch</th>
            <th className="py-2 px-4 border">Year</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.length > 0 ? (
            classes.map((cls) => (
              <tr key={cls.id} className="text-center">
                <td className="py-2 px-4 border">{cls.className}</td>
                <td className="py-2 px-4 border">{cls.branchName || "N/A"}</td>
                <td className="py-2 px-4 border">{cls.year}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEdit(cls)}
                    className="mr-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cls.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-2 px-4 border text-center">
                No classes available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
