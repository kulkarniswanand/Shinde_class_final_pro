const Class = require("../model/ClassmanagementModel");

exports.getAllClasses = (req, res) => {
  Class.getAll((err, results) => {
    if (err) {
      console.error("Error fetching all classes:", err);
      return res.status(500).json({ success: false, message: "Failed to fetch classes", error: err });
    }
    res.json({ success: true, data: results });
  });
};

exports.getClassesByBranch = (req, res) => {
  const { branchId } = req.params;
  if (!branchId) {
    return res.status(400).json({ success: false, message: "Branch ID is required" });
  }
  Class.getByBranch(branchId, (err, results) => {
    if (err) {
      console.error(`Error fetching classes for branch ${branchId}:`, err);
      return res.status(500).json({ success: false, message: "Failed to fetch classes by branch", error: err });
    }
    res.json({ success: true, data: results });
  });
};

exports.createClass = (req, res) => {
  const { className, branchId, year } = req.body;
  if (!className || !branchId || !year) {
    return res.status(400).json({ success: false, message: "All fields (className, branchId, year) are required" });
  }
  Class.create(req.body, (err, result) => {
    if (err) {
      console.error("Error creating class:", err);
      return res.status(500).json({ success: false, message: "Failed to create class", error: err });
    }
    res.json({ success: true, message: "Class created successfully", data: { id: result.insertId, ...req.body } });
  });
};

exports.updateClass = (req, res) => {
  const { id } = req.params;
  const { className, branchId, year } = req.body;
  if (!id || !className || !branchId || !year) {
    return res.status(400).json({ success: false, message: "ID and all fields (className, branchId, year) are required" });
  }
  Class.update(id, req.body, (err, result) => {
    if (err) {
      console.error(`Error updating class with ID ${id}:`, err);
      return res.status(500).json({ success: false, message: "Failed to update class", error: err });
    }
    res.json({ success: true, message: "Class updated successfully" });
  });
};

exports.deleteClass = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: "ID is required" });
  }
  Class.delete(id, (err) => {
    if (err) {
      console.error(`Error deleting class with ID ${id}:`, err);
      return res.status(500).json({ success: false, message: "Failed to delete class", error: err });
    }
    res.json({ success: true, message: "Class deleted successfully" });
  });
};