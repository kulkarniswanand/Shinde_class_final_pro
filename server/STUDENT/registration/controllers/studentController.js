const { addStudent } = require("../models/studentModel");

const registerStudent = (req, res) => {
  const studentData = req.body;

  // Validation: Check if all required fields are present
  if (
    !studentData.name ||
    !studentData.address ||
    !studentData.gender ||
    !studentData.dob ||
    !studentData.parentMobile ||
    !studentData.class ||
    !studentData.branch
  ) {
    return res.status(400).json({ error: "All required fields must be filled." });
  }

  // Debugging: Log received data
  console.log("Received student data:", studentData);

  addStudent(studentData, (err, result) => {
    if (err) {
      console.error("Error inserting student:", err);
      return res.status(500).json({ error: "Failed to register student." });
    }

    console.log("Student registered successfully with ID:", result.insertId);
    res.status(201).json({
      message: "Student registered successfully!",
      studentId: result.insertId,
    });
  });
};

module.exports = { registerStudent };
