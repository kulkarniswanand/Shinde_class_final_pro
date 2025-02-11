const { getAllBranches, updateBranchById } = require("../models/branchModel");

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

// Update a branch by ID
exports.updateBranch = async (req, res) => {
  const { id } = req.params;
  const { name, location, username, password } = req.body;

  try {
    const result = await updateBranchById(id, name, location, username, password);

    if (result.affectedRows > 0) {
      res.json({ message: "Branch updated successfully!" });
    } else {
      res.status(404).json({ message: "Branch not found" });
    }
  } catch (error) {
    console.error("Error updating branch:", error);
    res.status(500).json({ message: "Error updating branch", error });
  }
};
