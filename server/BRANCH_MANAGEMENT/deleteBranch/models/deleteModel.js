const db = require("../../../config/dbConfig");

// Fetch all branches
const getAllBranches = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM branches");
    return rows;
  } catch (error) {
    throw error;
  }
};

// Delete a branch by ID
const deleteBranchById = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM branches WHERE id = ?", [id]);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllBranches, deleteBranchById };
