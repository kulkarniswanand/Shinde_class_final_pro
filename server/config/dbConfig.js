require('dotenv').config();
const mysql = require('mysql2/promise');

// Create a promise-based connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'teachtrack',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
async function testDBConnection() {
  try {
    const connection = await db.getConnection();
    console.log('✅ Connected to MySQL Database:', process.env.DB_NAME);
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

testDBConnection();

module.exports = db;
