const studentExamLoginModel = require("../Model/studentExamLoginModel");

exports.loginStudent = async (req, res) => {
  const { username, password, studentName, standard, branch } = req.body;

  try {
    const student = await studentExamLoginModel.getStudentByCredentials(username, password, studentName, standard, branch);

    if (!student) {
      return res.status(401).json({ message: "Invalid credentials or student not found." });
    }

    res.status(200).json({
      message: "Login successful",
      role: "student",
      studentName: student.studentname,
      standard: student.class,
      branch: student.branch, 
    });
  } catch (error) { 
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllBranches = async (req, res) => {
  try {
    const branches = await studentExamLoginModel.getDistinctBranches();
    res.status(200).json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Failed to fetch branches" });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await studentExamLoginModel.getDistinctClasses();
    res.status(200).json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    res.status(500).json({ message: "Failed to fetch classes" });
  }
};

exports.resetStudentPassword = async (req, res) => {
  const { username, newPassword } = req.body;
  if (!username || !newPassword) {
    return res.status(400).json({ message: "Username and new password are required." });
  }
  try {
    const result = await studentExamLoginModel.updateStudentPassword(username, newPassword);
    if (result.affectedRows > 0) {
      return res.json({ message: "Password reset successful." });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
