const express = require("express");
const router = express.Router();
const db = require("../config/db"); // Assuming a MySQL connection is set up in this file

// Fetch all students with fee details
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all students with fee details...");
    const [students] = await db.query("SELECT * FROM FeesManagement");
    console.log("Students fetched successfully:", students);
    res.status(200).json(students); // Ensure installments are included in the response
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update fee details
router.put("/update", async (req, res) => {
  try {
    console.log("Update request received with body:", req.body);
    const { studentId, totalFees, amountGiven, discount, remainingFees, paymentDate, installments } = req.body;

    if (!studentId || !totalFees || !amountGiven || !remainingFees || !Array.isArray(installments)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Validation: Ensure amountGiven does not exceed totalFees
    if (amountGiven > totalFees) {
      return res.status(400).json({ message: "Amount given cannot exceed total fees" });
    }

    // Update student fee details
    const [result] = await db.query(
      "UPDATE FeesManagement SET totalFees = ?, amountGiven = ?, discount = ?, remainingFees = ? WHERE studentId = ?",
      [totalFees, amountGiven, discount, remainingFees, studentId]
    );

    if (result.affectedRows === 0) {
      console.warn("Student not found for ID:", studentId);
      return res.status(404).json({ message: "Student not found" });
    }

    // Insert new installments
    for (const installment of installments) {
      await db.query(
        "INSERT INTO Installments (studentId, paymentDate, amount) VALUES (?, ?, ?)",
        [studentId, installment.paymentDate, installment.amount]
      );
    }

    console.log("Student updated successfully");
    res.status(200).json({ message: "Student updated successfully" });
  } catch (error) {
    console.error("Error updating fee details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;