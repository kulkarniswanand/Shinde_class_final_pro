const connectDB = require('../../config/dbConfig');

async function findUserByCredentials(role, username, password) {
  const connection = await connectDB();
  const [rows] = await connection.execute(
    'SELECT role, username FROM users WHERE role = ? AND username = ? AND password = ?',
    [role, username, password]
  );
  await connection.end();
  return rows;
}

module.exports = {
  findUserByCredentials,
};
