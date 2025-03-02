import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await fetch("http://localhost:5000/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students data:", error);
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
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
      const response = await fetch(`http://localhost:5000/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to update student");
      }

      fetchStudents(); // Refresh student list after update
      onClose(); // Close the edit modal
      setTimeout(() => {
        alert("Student updated successfully!");
        console.log("Student updated successfully!");
      }, 100); // Alert appears with a small delay

    } catch (error) {
      console.error("Error updating student:", error);
      alert(`Error updating student: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (deleteStudentId) {
      try {
        const response = await fetch(`http://localhost:5000/api/students/${deleteStudentId}`, {
          method: "DELETE",
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to delete student");
        }

        fetchStudents(); // Refresh student list after deletion
        setDeleteStudentId(null); // Close the delete modal
        // alert("Student deleted successfully!");
      } catch (error) {
        console.error("Error deleting student:", error);
        alert(`Error deleting student: ${error.message}`);
      }
    }
  };

  const onClose = () => {
    setEditStudent(null);
    setDeleteStudentId(null);
  };

  const filteredStudents = students.filter((student) =>
    student[searchCriteria].toString().toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleNewStudent = () => {
    navigate("/studentRegistrationForm");
  };

  return (
    <div className="container mx-auto p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-6 text-violet-600">Student Details</h1>

      {/* Search Bars and New Student Button */}
      <div className="flex justify-between mb-6">
        <div className="flex">
          <select
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
            className="p-2 border rounded bg-gray text-black mr-2"
          >
            <option value="studentname">Name</option>
            <option value="gender">Gender</option>
            <option value="class">Class</option>
            <option value="branch">Branch</option>
            {/* Add more options as needed */}
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
          onClick={handleNewStudent}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Student
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
          {successMessage}
        </div>
      )}

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg bg-white">
          <thead className="bg-gray-800 text-violet-300 text-center">
            <tr>
              {["ID", "Name", "Address", "Gender", "DOB", "Parent Mobile", "Student Mobile", "Email", "Class", "Branch", "Admission Date", "Action"].map((heading) => (
                <th key={heading} className="p-3 text-left border border-gray-300 text-center">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="bg-black hover:bg-gray-900">
                <td className="p-3 border text-center">{student.id}</td>
                <td className="p-3 border text-center">{student.studentname}</td>
                <td className="p-3 border text-center">{student.address}</td>
                <td className="p-3 border text-center">{student.gender}</td>
                <td className="p-3 border text-center">{student.dob}</td>
                <td className="p-3 border text-center">{student.parentMobile}</td>
                <td className="p-3 border text-center">{student.studentMobile}</td>
                <td className="p-3 border text-center">{student.email}</td>
                <td className="p-3 border text-center">{student.class}</td>
                <td className="p-3 border text-center">{student.branch}</td>
                <td className="p-3 border text-center">{student.admissionDate}</td>
                <td className="p-3 border">
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => handleEdit(student)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setDeleteStudentId(student.id)}
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

      {/* Edit Student Modal */}
      {editStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-violet-600">Edit Student</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-1">Name</label>
                <input type="text" placeholder="Name" value={editStudent.studentname} onChange={(e) => setEditStudent({ ...editStudent, studentname: e.target.value })} className="p-2 border rounded bg-gray text-black" required />
                {errors.studentname && <p className="text-red-500 text-sm">{errors.studentname}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Address</label>
                <input type="text" placeholder="Address" value={editStudent.address} onChange={(e) => setEditStudent({ ...editStudent, address: e.target.value })} className="p-2 border rounded bg-gray text-black" />
              </div>
              <div>
                <label className="block text-white mb-1">Gender</label>
                <input type="text" placeholder="Gender" value={editStudent.gender} onChange={(e) => setEditStudent({ ...editStudent, gender: e.target.value })} className="p-2 border rounded bg-gray text-black" />
              </div>
              <div>
                <label className="block text-white mb-1">DOB</label>
                <input type="date" value={editStudent.dob} onChange={(e) => setEditStudent({ ...editStudent, dob: e.target.value })} className="p-2 border rounded bg-gray text-black" />
              </div>
              <div>
                <label className="block text-white mb-1">Parent Mobile</label>
                <input type="text" placeholder="Parent Mobile" value={editStudent.parentMobile} onChange={(e) => setEditStudent({ ...editStudent, parentMobile: e.target.value })} className="p-2 border rounded bg-gray text-black" />
                {errors.parentMobile && <p className="text-red-500 text-sm">{errors.parentMobile}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Student Mobile</label>
                <input type="text" placeholder="Student Mobile" value={editStudent.studentMobile} onChange={(e) => setEditStudent({ ...editStudent, studentMobile: e.target.value })} className="p-2 border rounded bg-gray text-black" />
                {errors.studentMobile && <p className="text-red-500 text-sm">{errors.studentMobile}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Email</label>
                <input type="email" placeholder="Email" value={editStudent.email} onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })} className="p-2 border rounded bg-gray text-black" required />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Class</label>
                <input type="text" placeholder="Class" value={editStudent.class} onChange={(e) => setEditStudent({ ...editStudent, class: e.target.value })} className="p-2 border rounded bg-gray text-black" required />
                {errors.class && <p className="text-red-500 text-sm">{errors.class}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Branch</label>
                <input type="text" placeholder="Branch" value={editStudent.branch} onChange={(e) => setEditStudent({ ...editStudent, branch: e.target.value })} className="p-2 border rounded bg-gray text-black" required />
                {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
              </div>
              <div>
                <label className="block text-white mb-1">Admission Date</label>
                <input type="date" value={editStudent.admissionDate} onChange={(e) => setEditStudent({ ...editStudent, admissionDate: e.target.value })} className="p-2 border rounded bg-gray text-black" />
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-violet-600">Confirm Delete</h2>
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
