const db = require("../../config/dbConfig");

exports.getStudentByCredentials = async (username, password, studentName, standard, branch) => {
  const [rows] = await db.query(
    `SELECT * FROM students 
     WHERE username = ? AND password = ? AND studentname = ? AND class = ? AND branch = ?`,
    [username, password, studentName, standard, branch]
  );

  return rows[0]; // return first match or undefined
};

exports.getDistinctBranches = async () => {
  const [rows] = await db.query("SELECT DISTINCT branch FROM students ORDER BY branch");
  return rows.map(row => row.branch); // Return an array of branch names
};

exports.getDistinctClasses = async () => {
  // Assuming 'class' column stores the standard
  // We need to extract the numeric part for correct sorting if classes are like "9th", "10th", etc.
  // REGEXP_SUBSTR extracts the leading digits. Adjust if your MySQL version doesn't support REGEXP_SUBSTR
  // or if the class format is different.
  const [rows] = await db.query("SELECT DISTINCT class FROM students ORDER BY CAST(REGEXP_SUBSTR(class, '^[0-9]+') AS UNSIGNED) DESC, class DESC");
  return rows.map(row => row.class); // Return an array of class names
};

// Helper to get student details for the login response (already implicitly handled by getStudentByCredentials)
// No new function needed here for login response as getStudentByCredentials already returns the necessary student details.
