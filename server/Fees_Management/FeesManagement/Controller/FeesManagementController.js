const FeesManagementModel = require("../Model/FeesManagementModel");


const getStudentsWithFees = async (req, res) => {
    try {
      const results = await FeesManagementModel.getStudentsWithFees();
      res.status(200).json(results);
    } catch (error) {
      console.error("Database error fetching student fees:", error);
      res.status(500).json({ message: "Server error fetching student fees", error: error.message });
    }
  };


const updateStudentFees = async (req, res) => {
  const { studentId, totalFees, amountGiven, remainingFees } = req.body;

  if (!studentId || totalFees === undefined || amountGiven === undefined || remainingFees === undefined) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await FeesManagementModel.updateFees(studentId, totalFees, amountGiven, remainingFees);
    res.status(200).json({ message: "Fees updated successfully" });
  } catch (error) {
    console.error("Error updating fees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getStudentsWithFees, updateStudentFees };
