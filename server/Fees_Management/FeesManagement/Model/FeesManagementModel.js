const db = require("../../../config/dbConfig");

const fetchAllStudentsWithFees = async () => {
  try {
    const [results] = await db.query(`
      SELECT 
          s.id AS studentId, 
          s.studentname, 
          s.class, 
          YEAR(s.admissionDate) AS year, 
          s.gender, 
          s.branch, 
          fs.totalAmount AS totalFees,
          fm.amountGiven,
          fm.remainingFees,
          fm.discount,
          fm.paymentDate
      FROM students s
      LEFT JOIN feesstructure fs 
          ON s.class = fs.class 
          AND s.gender = fs.gender
          AND s.branch = fs.branch 
          AND YEAR(s.admissionDate) = fs.year
      LEFT JOIN feesManagement fm 
          ON s.id = fm.studentId
    `);

    for (let student of results) {
      const [installments] = await db.query(
        "SELECT amount, date FROM feeInstallments WHERE studentId = ? ORDER BY date",
        [student.studentId]
      );
      student.installments = installments;
    }

    return results;
  } catch (err) {
    console.error("Database error fetching student fees:", err);
    throw err;
  }
};

const updateStudentFees = async (studentId, totalFees, amountGiven, discount, remainingFees, installments) => {
  try {
    // Update or insert main feesManagement record
    const [existing] = await db.query(
      "SELECT * FROM feesManagement WHERE studentId = ?",
      [studentId]
    );

    if (existing.length > 0) {
      await db.query(
        "UPDATE feesManagement SET totalFees = ?, amountGiven = ?, discount = ?, remainingFees = ?, paymentDate = ? WHERE studentId = ?",
        [totalFees, amountGiven, discount, remainingFees, new Date(), studentId]
      );
    } else {
      await db.query(
        "INSERT INTO feesManagement (studentId, totalFees, amountGiven, discount, remainingFees, paymentDate) VALUES (?, ?, ?, ?, ?, ?)",
        [studentId, totalFees, amountGiven, discount, remainingFees, new Date()]
      );
    }

    // Add new installment (last one in the list)
    const latestInstallment = installments[installments.length - 1];
    if (latestInstallment) {
      await db.query(
        "INSERT INTO feeInstallments (studentId, amount, date) VALUES (?, ?, ?)",
        [studentId, latestInstallment.amount, latestInstallment.date]
      );
    }

    return { success: true, message: "Fees updated successfully" };
  } catch (error) {
    console.error("Error updating fees:", error);
    return { success: false, message: "Database error during update" };
  }
};

module.exports = { fetchAllStudentsWithFees, updateStudentFees };
