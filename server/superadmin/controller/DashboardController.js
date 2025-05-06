const { fetchDashboardData } = require("../model/DashboardModel");

const getDashboardData = async (req, res) => {
  try {
    const data = await fetchDashboardData();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getDashboardData };
