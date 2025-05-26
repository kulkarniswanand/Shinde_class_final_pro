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

module.exports = {
  findUserByCredentials,
  findStudentByCredentials,
};
