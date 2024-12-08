const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root", // Your MySQL username
  password: "Swanand@2003", // Your MySQL password
  database: "teachtrack", // Database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
