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
          AND YEAR(s.admissionDate) = fs.year;
    `);
    return results;
  } catch (err) {
    console.error("Database error fetching student fees:", err);
    throw err;
  }
};
exports.updateFees = async (studentId, totalFees, amountGiven, remainingFees) => {
  try {
    await pool.query(
      "UPDATE feesManagement SET totalFees = ?, amountGiven = ?, remainingFees = ? WHERE studentId = ?",
      [totalFees, amountGiven, remainingFees, studentId]
    );
  } catch (error) {
    console.error("Error updating fees:", error);
    throw error;
  }
};



module.exports = { getStudentsWithFees };
