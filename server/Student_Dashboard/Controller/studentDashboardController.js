const db = require("../../config/dbConfig");
// It's a good practice to use a library like bcrypt for password hashing
// const bcrypt = require('bcryptjs'); 

// Update student profile
exports.updateProfile = async (req, res) => {
  // Destructure based on what StudentDashboard.js sends
  const { currentUsername, newUsername, newPassword } = req.body;

  try {
    // Validate input
    if (!currentUsername || !newUsername) {
      return res.status(400).json({ message: "Current username and new username are required." });
    }

    // Check if the student exists using currentUsername
    // Assuming your table is named 'students' and the lookup column is 'username'
    const [existing] = await db.query("SELECT * FROM students WHERE username = ?", [currentUsername]);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    let passwordToUpdate = existing[0].password; // Keep old password by default

    if (newPassword && newPassword.trim() !== "") {
      // **SECURITY WARNING: Always hash passwords before storing them!**
      // Example with bcrypt (you'll need to install bcryptjs: npm install bcryptjs)
      // const salt = await bcrypt.genSalt(10);
      // passwordToUpdate = await bcrypt.hash(newPassword, salt);
      passwordToUpdate = newPassword; // Replace this with actual hashing
    }

    // Update the 'students' table
    // Only updating username and password as per the frontend form
    const [result] = await db.query(
      "UPDATE students SET username = ?, password = ? WHERE username = ?",
      [newUsername, passwordToUpdate, currentUsername]
    );
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
};

// Get student profile (optional route)
exports.getProfile = async (req, res) => {
  const { username } = req.params;

  try {
    // Assuming your table is 'students'
    const [result] = await db.query("SELECT * FROM students WHERE username = ?", [username]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err });
  }
};
