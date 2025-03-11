const express = require('express');
const app = express();
const port = 5000;

// ...existing code...

app.get('/api/staff', async (req, res) => {
  try {
    const staff = await getStaffFromDatabase(); // Replace with actual database call
    console.log("Sending staff data:", staff); // Add logging
    res.json(staff);
  } catch (error) {
    console.error("Error fetching staff data:", error);
    res.status(500).json({ message: "Error fetching staff data" });
  }
});

app.get('/api/staff/branch/:branch', async (req, res) => {
  try {
    const branch = req.params.branch;
    const staff = await getStaffByBranchFromDatabase(branch); // Replace with actual database call
    console.log("Sending staff data by branch:", staff); // Add logging
    res.json(staff);
  } catch (error) {
    console.error("Error fetching staff data by branch:", error);
    res.status(500).json({ message: "Error fetching staff data by branch" });
  }
});

// ...existing code...

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
