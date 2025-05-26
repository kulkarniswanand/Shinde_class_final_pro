const db = require("../../config/dbConfig");
// d:\ATHARVA\Study\DEGREE\SEM-VIII\Final Year Project\Project Code 2\Shinde_class_final_pro\server\Student_Dashboard\Model\studentDashboardModel.js
const db = require("../../config/dbConfig");
// const bcrypt = require('bcryptjs'); // If you use bcrypt

const updateStudentProfile = async (currentUsername, newUsername, newPasswordHashed) => {
  // If newPasswordHashed is null/undefined, it means password is not being changed
  // The controller would decide whether to pass the old hash or a new one.
  // Or, build the query dynamically.
  // For simplicity here, assuming password will always be set in the query.
  const [result] = await db.query(
    "UPDATE students SET username=?, password=? WHERE username=?",
    [newUsername, newPasswordHashed, currentUsername]
  );
  return result;
};

const getStudentProfile = async (username) => {
  const [result] = await db.query("SELECT * FROM students WHERE username=?", [username]);
  return result.length > 0 ? result[0] : null; // Return null if not found
};

module.exports = {
  updateStudentProfile,
  getStudentProfile,
};

// const updateStudentProfile = async (username, password, profileImage, oldUsername) => {
//   const [result] = await db.query(
//     "UPDATE student_dashboard SET username=?, password=?, profileImage=? WHERE username=?",
//     [username, password, profileImage, oldUsername]
//   );
//   return result;
// };

// const getStudentProfile = async (username) => {
//   const [result] = await db.query("SELECT * FROM student_dashboard WHERE username=?", [username]);
//   return result[0];
// };

// module.exports = {
//   updateStudentProfile,
//   getStudentProfile,
// };
