const FeesManagementModel = require("../Model/FeesManagementModel");

const getStudentsWithFees = async (req, res) => {
  try {
    const results = await FeesManagementModel.getStudentsWithFees(); // ✅ model call
    res.status(200).json(results);
  } catch (error) {
    console.error("Database error fetching student fees:", error);
    res.status(500).json({ message: "Server error fetching student fees", error: error.message });
  }
};

const updateFees = async (req, res) => {
  const {
    studentId,
    totalFees,
    amountGiven,
    paymentDate,
    discount,
    remainingFees,
    installments
  } = req.body;

  if (!studentId || totalFees === undefined || amountGiven === undefined || !paymentDate) {
    return res.status(400).json({ error: "Required fields are missing" });
  }

  try {
    await FeesManagementModel.updateFees(
      studentId,
      totalFees,
      amountGiven,
      paymentDate,
      discount,
      remainingFees,
      installments
    );
    res.status(200).json({ message: "Fees updated successfully" });
  } catch (error) {
    console.error("Error updating fees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getStudentsWithFees, updateFees };
