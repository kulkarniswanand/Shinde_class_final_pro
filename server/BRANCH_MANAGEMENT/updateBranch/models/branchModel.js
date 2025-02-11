const db = require("../../addBranch/db"); // Import the DB connection

// Fetch all branches
exports.getAllBranches = async () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM branches";
    db.query(query, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Update a branch
exports.updateBranch = async (branchId, updatedData) => {
  return new Promise((resolve, reject) => {
    const { name, location, username, password } = updatedData;
    const query =
      "UPDATE branches SET name = ?, location = ?, username = ?, password = ? WHERE id = ?";
    db.query(
      query,
      [name, location, username, password, branchId],
      (error, results) => {
        if (error) return reject(error);
        resolve(results);
      }
    );
  });
};
