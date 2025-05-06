const db = require("../../../config/dbConfig");

const getStudentsWithFees = async () => {
  try {
    const [results] = await db.query(`
      SELECT 
          s.id AS studentId, 
          s.studentname, 
          s.class, 
          YEAR(s.admissionDate) AS year,
          s.gender, 
          s.branch,

          -- Use COALESCE to prioritize data from feesManagement if it exists
          COALESCE(fm.totalFees, fs.totalAmount) AS totalFees,
          fm.amountGiven,
          fm.discount,
          fm.remainingFees,
          fm.paymentDate

      FROM students s
      LEFT JOIN feesManagement fm ON s.id = fm.studentId
      LEFT JOIN feesstructure fs 
          ON s.class = fs.class 
          AND s.gender = fs.gender
          AND s.branch = fs.branch 
          AND YEAR(s.admissionDate) = fs.year
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




const updateFees = async (studentId, totalFees, amountGiven, paymentDate) => {
  try {
    console.log("Received:", { studentId, totalFees, amountGiven, paymentDate });

    // 1. Insert installment
    const [insertResult] = await db.query(
      "INSERT INTO feeinstallments (studentId, amount, date) VALUES (?, ?, ?)",
      [studentId, amountGiven, paymentDate]
    );
    console.log("Installment inserted:", insertResult);

    // 2. Get total amount paid so far
    const [installments] = await db.query(
      "SELECT SUM(amount) AS totalPaid FROM feeinstallments WHERE studentId = ?",
      [studentId]
    );
    const totalPaid = installments[0].totalPaid || 0;
    const remainingFees = totalFees - totalPaid;

    console.log("Total Paid:", totalPaid, "Remaining:", remainingFees);

    // 3. Update or insert into feesManagement
    const [existCheck] = await db.query(
      "SELECT COUNT(*) AS count FROM feesManagement WHERE studentId = ?",
      [studentId]
    );

    if (existCheck[0].count > 0) {
      const [updateRes] = await db.query(
        `UPDATE feesManagement 
         SET totalFees = ?, amountGiven = ?, remainingFees = ?, paymentDate = ?
         WHERE studentId = ?`,
        [totalFees, totalPaid, remainingFees, paymentDate, studentId]
      );
      console.log("Updated feesManagement:", updateRes);
    } else {
      const [insertMgmtRes] = await db.query(
        `INSERT INTO feesManagement 
         (studentId, totalFees, amountGiven, remainingFees, paymentDate) 
         VALUES (?, ?, ?, ?, ?)`,
        [studentId, totalFees, totalPaid, remainingFees, paymentDate]
      );
      console.log("Inserted feesManagement:", insertMgmtRes);
    }

  } catch (error) {
    console.error("Error updating fees:", error);
    return { success: false, message: "Database error during update" };
  }
};



module.exports = { getStudentsWithFees, updateFees };