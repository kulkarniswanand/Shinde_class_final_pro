const Branch = require("../models/branchModel");

// Get all branches
exports.getAllBranches = async (_req, res) => {
  try {
    const branches = await Branch.getAllBranches();
    res.status(200).json(branches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching branches", error });
  }
};

// Update a branch
exports.updateBranch = async (req, res) => {
  const branchId = req.params.id;
  const updatedData = req.body;

  if (!branchId || !updatedData) {
    return res.status(400).json({ message: "Invalid request data" });
  }

  try {
    await Branch.updateBranch(branchId, updatedData);
    res.status(200).json({ message: "Branch updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating branch", error });
  }
};
