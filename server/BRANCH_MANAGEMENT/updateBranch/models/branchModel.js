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

// Update branch details
const updateBranchById = async (id, name, location, username, password) => {
  try {
    const [result] = await db.query(
      "UPDATE branches SET name=?, location=?, username=?, password=? WHERE id=?",
      [name, location, username, password, id]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllBranches, updateBranchById };
