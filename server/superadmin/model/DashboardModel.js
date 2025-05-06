const db = require("../../config/dbConfig"); // Adjust the path as necessary

const fetchDashboardData = async () => {
  try {
    const [students] = await db.query("SELECT COUNT(*) AS totalStudents FROM students");
    const [fees] = await db.query("SELECT SUM(totalFees) AS totalFees, SUM(remainingFees) AS remainingFees FROM feesmanagement");

    const totalFees = fees[0]?.totalFees || 0;
    const remainingFees = fees[0]?.remainingFees || 0;
    const collectedFees = totalFees - remainingFees;

    return {
      totalStudents: students[0]?.totalStudents || 0,
      totalFees,
      remainingFees,
      collectedFees,
    };
  } catch (error) {
    console.error("Error fetching dashboard data from database:", error);
    throw error;
  }
};

module.exports = { fetchDashboardData };
