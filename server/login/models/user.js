const pool = require('../../config/dbConfig'); // Assuming dbConfig exports the mysql2 pool

async function findUserByCredentials(role, username, password) {
  // Using pool.execute for prepared statements
  const [rows] = await pool.execute(
    'SELECT role, username FROM users WHERE role = ? AND username = ? AND password = ?',
    [role, username, password]
  );
  return rows;
} 

async function findStudentByCredentials(studentName, username, password) {
  // Using pool.execute for prepared statements
  const [rows] = await pool.execute(
    'SELECT studentname, username FROM students WHERE studentname = ? AND username = ? AND password = ?',
    [studentName, username, password]
  );
  return rows;
}

async function updateUserPassword(username, newPassword) {
  const [result] = await pool.execute(
    'UPDATE users SET password = ? WHERE username = ?',
    [newPassword, username]
  );
  return result;
}

async function updateStudentPassword(username, newPassword) {
  const [result] = await pool.execute(
    'UPDATE students SET password = ? WHERE username = ?',
    [newPassword, username]
  );
  return result;
}

module.exports = {
  findUserByCredentials,
  findStudentByCredentials,
  updateUserPassword,
  updateStudentPassword,
};
