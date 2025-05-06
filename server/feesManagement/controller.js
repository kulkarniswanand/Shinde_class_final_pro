const db = require("../../config/dbConfig");

const updateFees = async (req, res) => {
  const { studentId, totalFees, installments, remainingFees } = req.body;

  try {
    // Update the fees data in the database
    await db.query(
      "UPDATE feesmanagement SET totalFees = ?, remainingFees = ?, installments = ? WHERE studentId = ?",
      [totalFees, remainingFees, JSON.stringify(installments), studentId]
    );

    res.status(200).json({ message: "Fees updated successfully" });
  } catch (error) {
    console.error("Error updating fees:", error);
    res.status(500).json({ error: "Failed to update fees" });
  }
};

module.exports = { updateFees };
