const { fetchAllStudentsWithFees, updateStudentFees } = require("../Model/FeesManagementModel");

// Fetch all students with fee details
const getAllStudentsWithFees = async (req, res) => {
  try {
    console.log("Fetching all students with fee details...");
    const students = await fetchAllStudentsWithFees();
    console.log("Students fetched successfully:", students);
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update student fee details
const updateFees = async (req, res) => {
  try {
    console.log("Update request received with body:", req.body);
    const { studentId, totalFees, amountGiven, discount, remainingFees, installments } = req.body;

    // Validate input data
    if (!studentId || !totalFees || !amountGiven || !remainingFees || !Array.isArray(installments)) {
      console.error("Invalid input data:", req.body);
      return res.status(400).json({ message: "Invalid input data" });
    }

    if (amountGiven > totalFees) {
      console.error("Amount given exceeds total fees:", { amountGiven, totalFees });
      return res.status(400).json({ message: "Amount given cannot exceed total fees" });
    }

    // Call the model function to update fees
    const result = await updateStudentFees(studentId, totalFees, amountGiven, discount, remainingFees, installments);

    if (!result.success) {
      console.error("Update failed:", result.message);
      return res.status(404).json({ message: result.message });
    }

    console.log("Update successful:", result.message);
    res.status(200).json({ message: result.message });
  } catch (error) {
    console.error("Error updating fee details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllStudentsWithFees, updateFees };
