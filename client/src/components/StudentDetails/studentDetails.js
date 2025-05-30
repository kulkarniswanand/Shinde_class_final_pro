import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Input, Select, Button, DatePicker } from "antd"; // Import DatePicker
import moment from "moment"; // Import moment for date formatting
import CircularNav from "../CircularNav/CircularNav"; // Import CircularNav

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("studentname");
  const [searchValue, setSearchValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);
 
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/studentsDetails");
      if (!response.ok) {
        throw new Error("Failed to fetch students data");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students data:", error);
      alert("Error fetching students data. Please try again later.");
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setErrors({});
  };

  const handleDateChange = (date, dateString) => {
    setEditStudent({ ...editStudent, dob: dateString });
  };

  const generateWhatsAppMessage = (student) => {
    const message = `Hello, here are the updated details for your child:
    - Name: ${student.studentname}
    - Address: ${student.address || "N/A"}
    - Gender: ${student.gender || "N/A"}
    - DOB: ${student.dob || "N/A"}
    - Parent Mobile: ${student.parentMobile || "N/A"}
    - Student Mobile: ${student.studentMobile || "N/A"}
    - Email: ${student.email || "N/A"}
    - Class: ${student.class || "N/A"}
    - Branch: ${student.branch || "N/A"}
    - Admission Date: ${student.admissionDate || "N/A"}`;
    return encodeURIComponent(message);
  };

  const validate = () => {
    const newErrors = {};
    if (!editStudent.studentname) newErrors.studentname = "Name is required.";
    if (!editStudent.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(editStudent.email)) newErrors.email = "Email is invalid.";
    if (!editStudent.class) newErrors.class = "Class is required.";
    if (!editStudent.branch) newErrors.branch = "Branch is required.";
    if (editStudent.parentMobile && !/^\d{10}$/.test(editStudent.parentMobile)) newErrors.parentMobile = "Parent Mobile must be 10 digits.";
    if (editStudent.studentMobile && !/^\d{10}$/.test(editStudent.studentMobile)) newErrors.studentMobile = "Student Mobile must be 10 digits.";
    return newErrors;
  };

  const updateStudentDetails = async (id, formData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/studentsDetails/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update student details");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating student details:", error);
      throw error;
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } 

    const id = editStudent.id;

    const formData = {
      studentname: editStudent.studentname,
      address: editStudent.address || "",
      gender: editStudent.gender || "",
      dob: editStudent.dob || "",
      parentMobile: editStudent.parentMobile || "",
      studentMobile: editStudent.studentMobile || "",
      email: editStudent.email,
      class: editStudent.class,
      branch: editStudent.branch,
      admissionDate: editStudent.admissionDate || "",
    };

    try {
      await updateStudentDetails(id, formData);
      fetchStudents(); // Refresh student list after update
      onClose(); // Close the edit modal
      alert("Student updated successfully!");
    } catch (error) {
      console.error("Error updating student:", error);
      alert(`Error updating student: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (deleteStudentId) {
      try {
        const response = await fetch(`http://localhost:5000/api/studentsDetails/${deleteStudentId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete student");
        }

        fetchStudents(); // Refresh student list after deletion
        setDeleteStudentId(null); // Close the delete modal
        alert("Student deleted successfully!");
      } catch (error) {
        console.error("Error deleting student:", error);
        alert(`Error deleting student: ${error.message}`);
      }
    }
  };

  const onClose = () => {
    setEditStudent(null);
    setDeleteStudentId(null);
    setErrors({});
  };

  const filteredStudents = students.filter((student) => {
    if (!searchValue) return true; // If no filter value, show all students
    const fieldValue = student[searchCriteria]?.toString().toLowerCase() || "";

    // Handle exact match for specific fields
    if (["gender", "class", "branch"].includes(searchCriteria)) {
      return fieldValue === searchValue.toLowerCase();
    }

    // Handle partial match for other fields
    return fieldValue.includes(searchValue.toLowerCase());
  });

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "studentname", key: "studentname" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      render: (dob) => (dob ? moment(dob).format("YYYY-MM-DD") : "N/A"), // Format DOB in table
    },
    { title: "Parent Mobile", dataIndex: "parentMobile", key: "parentMobile" },
    { title: "Student Mobile", dataIndex: "studentMobile", key: "studentMobile" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Class", dataIndex: "class", key: "class" },
    { title: "Branch", dataIndex: "branch", key: "branch" },
    { title: "Admission Date", dataIndex: "admissionDate", key: "admissionDate" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => handleEdit(record)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            onClick={() => setDeleteStudentId(record.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
          <a
            href={`https://wa.me/${record.parentMobile}?text=${generateWhatsAppMessage(record)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-center"
          >
            WhatsApp
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5 bg-black text-white min-h-screen">
      <CircularNav /> {/* Add CircularNav component */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-violet-600">Student Details</h2>
        {/* "Go to Dashboard" button removed, CircularNav will be in top-right */}
      </div>

      <div className="flex items-center gap-4 my-4">
        <Select
          value={searchCriteria}
          onChange={(value) => setSearchCriteria(value)}
          className="bg-gray-800 text-white rounded-md"
          style={{ width: 200 }}
        >
          <Select.Option value="id">ID</Select.Option>
          <Select.Option value="studentname">Name</Select.Option>
          <Select.Option value="address">Address</Select.Option>
          <Select.Option value="gender">Gender</Select.Option>
          <Select.Option value="dob">DOB</Select.Option>
          <Select.Option value="parentMobile">Parent Mobile</Select.Option>
          <Select.Option value="studentMobile">Student Mobile</Select.Option>
          <Select.Option value="email">Email</Select.Option>
          <Select.Option value="class">Class</Select.Option>
          <Select.Option value="branch">Branch</Select.Option>
          <Select.Option value="admissionDate">Admission Date</Select.Option>
        </Select>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Enter value"
          className="bg-gray-800 text-black rounded-md p-2"
        />
        <Button onClick={() => navigate("/studentRegistrationForm")} className="bg-blue-500 hover:bg-blue-600 text-white">
          New Student
        </Button>
      </div>

      <Table
        dataSource={filteredStudents}
        columns={columns}
        rowKey="id"
        className="bg-gray-800 text-white"
        pagination={{ pageSize: 10 }}
      />

      {/* Edit Student Modal */}
      {editStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Edit Student</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-1">Name</label>
                <input type="text" placeholder="Name" value={editStudent.studentname} onChange={(e) => setEditStudent({ ...editStudent, studentname: e.target.value })} className="p-2 border rounded bg-gray-700 text-white w-full" required />
                {errors.studentname && <p className="text-red-500 text-sm">{errors.studentname}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Address</label>
                <input type="text" placeholder="Address" value={editStudent.address} onChange={(e) => setEditStudent({ ...editStudent, address: e.target.value })} className="p-2 border rounded bg-gray-700 text-white w-full" />
              </div>
              <div>
                <label className="block text-white mb-1">Gender</label>
                <input type="text" placeholder="Gender" value={editStudent.gender} onChange={(e) => setEditStudent({ ...editStudent, gender: e.target.value })} className="p-2 border rounded bg-gray-700 text-white w-full" />
              </div>
              <div>
                <label className="block text-white mb-1">DOB</label>
                <DatePicker
                  value={editStudent.dob ? moment(editStudent.dob, "YYYY-MM-DD") : null}
                  onChange={handleDateChange}
                  format="YYYY-MM-DD"
                  className="w-full bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-white mb-1">Parent Mobile</label>
                <input type="text" placeholder="Parent Mobile" value={editStudent.parentMobile} onChange={(e) => setEditStudent({ ...editStudent, parentMobile: e.target.value })} className="p-2 border rounded bg-gray-700 text-white w-full" />
                {errors.parentMobile && <p className="text-red-500 text-sm">{errors.parentMobile}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Student Mobile</label>
                <input type="text" placeholder="Student Mobile" value={editStudent.studentMobile} onChange={(e) => setEditStudent({ ...editStudent, studentMobile: e.target.value })} className="p-2 border rounded bg-gray-700 text-white w-full" />
                {errors.studentMobile && <p className="text-red-500 text-sm">{errors.studentMobile}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Email</label>
                <input type="email" placeholder="Email" value={editStudent.email} onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })} className="p-2 border rounded bg-gray-700 text-white w-full" required />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Class</label>
                <input type="text" placeholder="Class" value={editStudent.class} onChange={(e) => setEditStudent({ ...editStudent, class: e.target.value })} className="p-2 border rounded bg-gray-700 text-white w-full" required />
                {errors.class && <p className="text-red-500 text-sm">{errors.class}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Branch</label>
                <input type="text" placeholder="Branch" value={editStudent.branch} onChange={(e) => setEditStudent({ ...editStudent, branch: e.target.value })} className="p-2 border rounded bg-gray-700 text-white w-full" required />
                {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Admission Date</label>
                <input type="date" value={editStudent.admissionDate} onChange={(e) => setEditStudent({ ...editStudent, admissionDate: e.target.value })} className="p-2 border rounded bg-gray-700 text-white w-full" />
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
      {deleteStudentId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Confirm Delete</h2>
            <p className="mb-4 text-white">Are you sure you want to delete this student?</p>
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

export default StudentDetails;
