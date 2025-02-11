const pool = require("../../config/dbConfig"); // Import the connection pool

async function login(req, res) {
  const { role, username, password } = req.body;

  try {
    // Query to check if the user exists with the given credentials
    const [users] = await pool.query(
      "SELECT role FROM users WHERE role = ? AND username = ? AND password = ?",
      [role, username, password]
    );

    if (users.length > 0) {
      return res.json({ role: users[0].role, message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { login };
