import React, { useState, useEffect } from "react";

const StudentDetails = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudentsData();
  }, []);

  const fetchStudentsData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/studentsDetails`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setStudentsData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching students data:", error);
      setStudentsData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (id) => {
    setShowUpdateForm(id);
  };

  const filteredStudents = studentsData.filter(student =>
    student._id?.toString().includes(searchTerm) ||
    student.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.branch?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-violet-400 mb-6">Student Details</h1>
      <input
        type="text"
        placeholder="Search by ID, Class, Branch"
        className="w-full p-2 mb-4 bg-gray-800 text-white rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <p className="text-center text-gray-300">Loading students data...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-violet-300">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Class</th>
              <th className="p-3">Branch</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id} className="border-b border-gray-700 hover:bg-gray-900">
                <td className="p-3">{student._id}</td>
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.class}</td>
                <td className="p-3">{student.branch?.name || "N/A"}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleUpdate(student._id)}
                    className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showUpdateForm && <UpdateStudentForm id={showUpdateForm} onClose={() => setShowUpdateForm(null)} fetchStudents={fetchStudentsData} />}
    </div>
  );
};

const UpdateStudentForm = ({ id, onClose, fetchStudents }) => {
  const [formData, setFormData] = useState({ name: "", class: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/students/${id}`);
        if (!response.ok) throw new Error("Failed to fetch student details");
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error("Failed to update student");
      fetchStudents();
      onClose();
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white">
        <h2 className="text-xl font-semibold mb-4">Update Student Details</h2>
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 bg-gray-800 text-white rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Class"
            className="w-full p-2 bg-gray-800 text-white rounded"
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            required
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="bg-gray-700 px-3 py-1 rounded">Cancel</button>
            <button type="submit" className="bg-violet-600 hover:bg-violet-700 px-3 py-1 rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentDetails;
