const db = require("../../config/dbConfig");

// Fetch all classes
exports.getAll = async () => {
  console.log("Fetching all classes from the database..."); // Debug log
  const query = `
    SELECT c.id, c.name AS className, c.academicYear AS year, b.name AS branchName
    FROM classes c
    LEFT JOIN branches b ON c.branchId = b.id
  `;
  const [rows] = await db.query(query); // Fetch classes with branch names
  console.log("Fetched classes:", rows); // Debug log
  return rows;
};

// Create a new class
exports.create = async (className, branchId, academicYear) => {
  console.log("Parameters received in create method:", { className, branchId, academicYear }); // Debug log

  if (typeof className !== "string" || typeof branchId !== "number" || typeof academicYear !== "string") {
    throw new TypeError("Invalid input types: className must be a string, branchId must be a number, and academicYear must be a string.");
  }

  const query = `
    INSERT INTO classes (name, branchId, academicYear) 
    VALUES (?, ?, ?)
  `;
  const [result] = await db.query(query, [className, branchId, academicYear]);
  return result;
};
