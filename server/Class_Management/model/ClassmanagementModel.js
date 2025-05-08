const db = require("../../config/dbConfig");

// Fetch all classes
exports.getAll = async () => {
  const query = "SELECT * FROM classes";
  const [rows] = await db.query(query); // Removed .promise() as db is already promise-based
  return rows;
};

// Create a new class
exports.create = async (className, branchId, academicYear) => {
  const query = `
    INSERT INTO classes (name, branchId, academicYear) 
    VALUES (?, ?, ?)
  `;
  const [result] = await db.query(query, [className, branchId, academicYear]);
  return result;
};
