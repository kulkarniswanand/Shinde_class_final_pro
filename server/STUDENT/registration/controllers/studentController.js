const Student = require("../models/studentModel");

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.getAllStudents();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

// Update student details
exports.updateStudent = async (req, res) => {
  try {
    const updated = await Student.updateStudent(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const studentId = await Student.addStudent(req.body);
    res.json({ message: "Student added successfully", studentId });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
};
