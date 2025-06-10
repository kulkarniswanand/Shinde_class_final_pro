const { findUserByCredentials, findStudentByCredentials, updateUserPassword, updateStudentPassword } = require('../models/user');

async function login(req, res) {
  const { role, username, password, studentName } = req.body;

  try {
    if (role === "student") { 
      if (!studentName) {
        return res.status(400).json({ message: "Student name is required for student login" });
      }
      const students = await findStudentByCredentials(studentName, username, password);
      if (students.length > 0) {
        // Student found and credentials match
        return res.json({ role: "student", message: "Login successful" });
      } else {
        // Invalid student credentials
        return res.status(401).json({ message: "Invalid student credentials" });
      }
    } else {
      // Logic for other roles (superadmin, admin, user)
      const users = await findUserByCredentials(role, username, password);
      if (users.length > 0) {
        return res.json({ role: users[0].role, message: "Login successful" });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    }

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function resetPassword(req, res) {
  const { username, newPassword, role } = req.body;
  if (!username || !newPassword) {
    return res.status(400).json({ message: "Username and new password are required." });
  }
  try {
    let result;
    if (role === "student") {
      result = await updateStudentPassword(username, newPassword);
    } else {
      result = await updateUserPassword(username, newPassword);
    }
    if (result.affectedRows > 0) {
      return res.json({ message: "Password reset successful." });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error("Error during password reset:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { login, resetPassword };
