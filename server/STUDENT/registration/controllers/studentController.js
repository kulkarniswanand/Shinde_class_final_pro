const { addStudent } = require("../models/studentModel");

const registerStudent = async (req, res) => {
  try {
    const studentData = req.body;

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

    console.log("📩 Received student data:", studentData);

    const result = await addStudent(studentData);

    if (!result || !result.insertId) {
      console.error("⚠️ Insert failed, no insertId received.");
      return res.status(500).json({ error: "Failed to register student." });
    }

    console.log("✅ Student registered successfully with ID:", result.insertId);

    return res.status(201).json({
      message: "Student registered successfully!",
      studentId: result.insertId,
    });

  } catch (error) {
    console.error("❌ Registration Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { registerStudent };