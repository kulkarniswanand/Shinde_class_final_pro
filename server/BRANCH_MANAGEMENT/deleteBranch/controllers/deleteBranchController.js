const { getAllBranches, deleteBranchById } = require("../models/deleteModel");

// Fetch all branches
exports.getBranches = async (req, res) => {
  try {
    const branches = await getAllBranches();
    res.json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    res.status(500).json({ message: "Error fetching branches", error });
  }
};

// Delete a branch by ID
exports.deleteBranch = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteBranchById(id);

    if (result.affectedRows > 0) {
      res.json({ message: "Branch deleted successfully!" });
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    console.error("Error deleting branch:", error);
    res.status(500).json({ message: "Error deleting branch", error });
  }
};
