require('dotenv').config();  // Ensure environment variables are loaded

const mysql = require('mysql2/promise');  // Using the promise-based version

// Database configuration using environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost', 
  user: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || 'your_password', 
  database: process.env.DB_NAME || 'your_database', 
};

const pool = mysql.createPool(dbConfig);  // Use connection pool for better performance

// Function to get a connection from the pool
async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully!');
    return connection;  // Return the connection for use in queries
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    throw error;  // Propagate the error to be handled at higher levels
  }
}

// Export the pool for use in other parts of the application
module.exports = pool;
