require('dotenv').config();

const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost', 
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || 'your_password', 
  database: process.env.DB_NAME || 'your_database', 
};

async function connectDB() {
  const connection = await mysql.createConnection(dbConfig);
  console.log('Database connected successfully!');
  return connection;
}

module.exports = connectDB;