const db = require("../../config/dbConfig");

// Fetch all students
exports.getAllStudents = async (req, res) => {
  try {
    const [students] = await db.query("SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as dob FROM students");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student details", error });
  }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { studentname, address, gender, dob, parentMobile, studentMobile, email, class: studentClass, branch, admissionDate } = req.body;

  // Ensure required fields are not undefined or null
  if (!studentname || !address || !gender || !dob || !parentMobile || !studentMobile || !email || !studentClass || !branch || !admissionDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [result] = await db.query(
      `UPDATE students SET 
        studentname=?, address=?, gender=?, dob=?, 
        parentMobile=?, studentMobile=?, email=?, class=?, 
        branch=?, admissionDate=? WHERE id=?`,
      [studentname, address, gender, dob, parentMobile, studentMobile, email, studentClass, branch, admissionDate, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating student details", error });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM students WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};
