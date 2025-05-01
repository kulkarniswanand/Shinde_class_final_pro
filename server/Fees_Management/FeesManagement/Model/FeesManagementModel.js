const db = require("../../../config/dbConfig");

// Get student fees with filters: year, branch, class, and gender
const getStudentsWithFees = async () => {
  try {
    const [results] = await db.query(`
      SELECT 
          s.id AS studentId, 
          s.studentname, 
          s.class, 
          YEAR(s.admissionDate) AS year,  -- Extracts year only
          s.gender, 
          s.branch, 
          fs.totalAmount AS totalFees
      FROM students s
      LEFT JOIN feesstructure fs 
          ON s.class = fs.class 
          AND s.gender = fs.gender
          AND s.branch = fs.branch 
          AND YEAR(s.admissionDate) = fs.year
      WHERE s.id IS NOT NULL; -- Ensure only valid student records are fetched
    `);

    if (results.length === 0) {
      console.warn("No student fees data found.");
    }

    return results;
  } catch (err) {
    console.error("Database error fetching student fees:", err);
    throw err;
  }
};

const updateFees = async (studentId, totalFees, amountGiven, paymentDate) => {
  try {
    const [results] = await db.query(
      "SELECT COUNT(*) AS count FROM feesManagement WHERE studentId = ?",
      [studentId]
    );

    if (results[0].count > 0) {
      // Update existing record
      await db.query(
        "UPDATE feesManagement SET totalFees = ?, amountGiven = ?, paymentDate = ? WHERE studentId = ?",
        [totalFees, amountGiven, paymentDate, studentId]
      );
    } else {
      // Insert new record
      await db.query(
        "INSERT INTO feesManagement (studentId, totalFees, amountGiven, paymentDate) VALUES (?, ?, ?, ?)",
        [studentId, totalFees, amountGiven, paymentDate]
      );
    }
  } catch (error) {
    console.error("Error updating fees:", error);
    throw error;
  }
};

module.exports = { getStudentsWithFees, updateFees };