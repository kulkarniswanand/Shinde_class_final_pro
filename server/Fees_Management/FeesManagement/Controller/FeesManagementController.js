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
    try {
        const { student_id, amount_paid } = req.body;

        if (!student_id || !amount_paid) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        await FeesManagementModel.updateStudentFees(student_id, amount_paid);
        res.status(200).json({ message: "Student fees updated successfully" });
    } catch (error) {
        console.error("Error updating student fees:", error);
        res.status(500).json({ message: "Server error updating student fees", error: error.message });
    }
};

module.exports = { getStudentsWithFees, updateStudentFees };
