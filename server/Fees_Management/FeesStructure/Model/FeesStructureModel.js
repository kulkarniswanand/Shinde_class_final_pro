const pool = require("../../../config/dbConfig");

// Get all Fees Structures
exports.getAllFeesStructures = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM Feesstructure");
    return rows;
  } catch (error) {
    console.error("Error fetching all fees structures:", error);
    throw error;
  }
};

// Get a single Fees Structure by ID
exports.getFeesStructureById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Feesstructure WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error(`Error fetching fees structure with ID ${id}:`, error);
    throw error;
  }
};

// Create a new Fees Structure
exports.createFeesStructure = async (feesData) => {
  const { className, year, gender, branch, totalAmount } = feesData;
  try {
    const [result] = await pool.query(
      "INSERT INTO Feesstructure (class, year, gender, branch, totalAmount) VALUES (?, ?, ?, ?, ?)",
      [className, year, gender, branch, totalAmount]
    );
    return result.insertId;
  } catch (error) {
    console.error("Error creating fees structure:", error);
    throw error;
  }
};

// Update an existing Fees Structure
exports.updateFeesStructure = async (id, feesData) => {
  const { className, year, gender, branch, totalAmount } = feesData;
  try {
    const [result] = await pool.query(
      "UPDATE Feesstructure SET class=?, year=?, gender=?, branch=?, totalAmount=? WHERE id=?",
      [className, year, gender, branch, totalAmount, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error(`Error updating fees structure with ID ${id}:`, error);
    throw error;
  }
};

// Delete a Fees Structure
exports.deleteFeesStructure = async (id) => {
  try {
    const [result] = await pool.query("DELETE FROM Feesstructure WHERE id=?", [id]);
    return result.affectedRows;
  } catch (error) {
    console.error(`Error deleting fees structure with ID ${id}:`, error);
    throw error;
  }
};
