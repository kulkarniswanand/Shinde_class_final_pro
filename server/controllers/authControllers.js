const mysql = require('mysql');

// Create a database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Swanand@2003',  // Replace with your DB password
  database: 'teachtrack', // Replace with your database name
});

// Check if the connection is successful
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to the database.");
});

// Controller for login
exports.loginUser = (req, res) => {
  const { username, password, role } = req.body;

  // Query to find the user by username
  const query = 'SELECT * FROM users WHERE username = ? AND role = ?';
  
  db.query(query, [username, role], (err, results) => {
    if (err) {
      console.error("Error querying database: " + err.stack);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or role' });
    }

    const user = results[0];
    
    // Check if the password matches (assuming password is stored as plain text)
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // If all credentials are valid, return success
    return res.status(200).json({
      message: 'Login successful',
      role: user.role,
      username: user.username,
    });
  });
};
