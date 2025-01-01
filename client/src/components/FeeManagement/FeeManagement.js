import React, { useState } from "react";

const FeeManagement = () => {
  const [filter, setFilter] = useState({
    name: "",
    rollNumber: "",
    class: "",
    year: "",
  });

  const [students, setStudents] = useState([
    { rollNumber: "101", name: "John Doe", class: "10", year: "2024", feeStatus: "Paid" },
    { rollNumber: "102", name: "Jane Smith", class: "9", year: "2023", feeStatus: "Unpaid" },
    // Add more student data as needed
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredStudents = students.filter((student) => {
    return (
      (filter.name === "" || student.name.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.rollNumber === "" || student.rollNumber.includes(filter.rollNumber)) &&
      (filter.class === "" || student.class === filter.class) &&
      (filter.year === "" || student.year === filter.year)
    );
  });

  const handleFeeStatusClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-purple-400 mb-8">Fee Management</h1>

      {/* Filter Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-purple-300 mb-4">Filter Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400">Name</label>
            <input
              type="text"
              name="name"
              value={filter.name}
              onChange={handleFilterChange}
              className="mt-2 block w-full rounded-lg bg-gray-700 border-gray-600 shadow-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={filter.rollNumber}
              onChange={handleFilterChange}
              className="mt-2 block w-full rounded-lg bg-gray-700 border-gray-600 shadow-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Class</label>
            <input
              type="text"
              name="class"
              value={filter.class}
              onChange={handleFilterChange}
              className="mt-2 block w-full rounded-lg bg-gray-700 border-gray-600 shadow-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400">Year</label>
            <input
              type="text"
              name="year"
              value={filter.year}
              onChange={handleFilterChange}
              className="mt-2 block w-full rounded-lg bg-gray-700 border-gray-600 shadow-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-purple-300 mb-4">Student Details</h2>
        <table className="w-full table-auto border-collapse border border-gray-700">
          <thead className="bg-purple-500">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Roll Number</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Class</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Year</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fee Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.rollNumber} className="odd:bg-gray-700 even:bg-gray-800">
                <td className="px-4 py-3 text-sm text-gray-200">{student.rollNumber}</td>
                <td className="px-4 py-3 text-sm text-gray-200">{student.name}</td>
                <td className="px-4 py-3 text-sm text-gray-200">{student.class}</td>
                <td className="px-4 py-3 text-sm text-gray-200">{student.year}</td>
                <td className="px-4 py-3 text-sm text-gray-200">
                  <button
                    onClick={() => handleFeeStatusClick(student)}
                    className={`px-4 py-2 rounded-md font-medium text-white transition-all duration-200 ${
                      student.feeStatus === "Paid" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {student.feeStatus}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fee Status Component */}
      {selectedStudent && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">Fee Status</h2>
          <div className="space-y-2 text-gray-300">
            <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Class:</strong> {selectedStudent.class}</p>
            <p><strong>Year:</strong> {selectedStudent.year}</p>
            <p><strong>Status:</strong> {selectedStudent.feeStatus}</p>
          </div>
          <button
            onClick={() => setSelectedStudent(null)}
            className="mt-6 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FeeManagement;
