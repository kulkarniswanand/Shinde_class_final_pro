const pool = require("../../../config/dbConfig");

// Get all Fees Structures
exports.getAllFeesStructures = async () => {
  const [rows] = await pool.query("SELECT * FROM Feesstructure");
  return rows;
};

// Get a single Fees Structure by ID
exports.getFeesStructureById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM Feesstructure WHERE id = ?", [id]);
  return rows[0];
};

// Create a new Fees Structure
exports.createFeesStructure = async (feesData) => {
  const { className, year, gender, branch, totalAmount } = feesData;
  const [result] = await pool.query(
    "INSERT INTO Feesstructure (class, year, gender, branch, totalAmount) VALUES (?, ?, ?, ?, ?)",
    [className, year, gender, branch, totalAmount]
  );
  return result.insertId;
};

// Update an existing Fees Structure
exports.updateFeesStructure = async (id, feesData) => {
  const { className, year, gender, branch, totalAmount } = feesData;
  const [result] = await pool.query(
    "UPDATE Feesstructure SET class=?, year=?, gender=?, branch=?, totalAmount=? WHERE id=?",
    [className, year, gender, branch, totalAmount, id]
  );
  return result.affectedRows;
};

// Delete a Fees Structure
exports.deleteFeesStructure = async (id) => {
  const [result] = await pool.query("DELETE FROM Feesstructure WHERE id=?", [id]);
  return result.affectedRows;
};
