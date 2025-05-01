const db = require("../../../config/dbConfig");

// Fetch all students with fee details
const fetchAllStudentsWithFees = async () => {
  try {
    const [students] = await db.query("SELECT * FROM FeesManagement");
    return students;
  } catch (error) {
    console.error("Error fetching students from database:", error);
    throw error;
  }
};

// Update student fee details
const updateStudentFees = async (studentId, totalFees, amountGiven, discount, remainingFees, installments) => {
  const connection = await db.getConnection(); // Get a connection for transaction
  try {
    await connection.beginTransaction(); // Start transaction

    const [result] = await connection.query(
      "UPDATE FeesManagement SET totalFees = ?, amountGiven = ?, discount = ?, remainingFees = ? WHERE studentId = ?",
      [totalFees, amountGiven, discount, remainingFees, studentId]
    );

    if (result.affectedRows === 0) {
      await connection.rollback(); // Rollback transaction if student not found
      return { success: false, message: "Student not found" };
    }

    for (const installment of installments) {
      await connection.query(
        "INSERT INTO Installments (studentId, paymentDate, amount) VALUES (?, ?, ?)",
        [studentId, installment.paymentDate, installment.amount]
      );
    }

    await connection.commit(); // Commit transaction
    return { success: true, message: "Student updated successfully" };
  } catch (error) {
    await connection.rollback(); // Rollback transaction on error
    console.error("Error updating student fees in database:", error);
    throw error;
  } finally {
    connection.release(); // Release the connection
  }
};

module.exports = { fetchAllStudentsWithFees, updateStudentFees };
