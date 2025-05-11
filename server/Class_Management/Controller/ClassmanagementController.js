const Class = require("../model/ClassmanagementModel");

exports.getAllClasses = (req, res) => {
  Class.getAll((err, results) => {
    if (err) {
      console.error("Error fetching all classes:", err);
      return res.status(500).json({ success: false, message: "Failed to fetch classes", error: err });
    }
    res.status(200).json({ success: true, data: results });
  });
};

exports.createClass = (req, res) => {
  console.log("Received request body:", req.body); // Debug log to inspect the request body

  const { className, branchId, year } = req.body;

  if (!className || !branchId || !year) {
    return res  .status(400).json({ success: false, message: "All fields (className, branchId, year) are required" });
  }

  // Convert branchId to a number
  const parsedBranchId = parseInt(branchId, 10);

  // Validate input types
  if (typeof className !== "string" || isNaN(parsedBranchId) || typeof year !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid input types: className must be a string, branchId must be a number, and year must be a string.",
    });
  }

  // Call the model's create function with the corrected parameters
  Class.create(className, parsedBranchId, year, (err, result) => {
    if (err) {
      console.error("Error creating class:", err);
      return res.status(500).json({ success: false, message: "Failed to create class", error: err });
    }

    // Send a proper response after successful insertion
    res.status(200).json({
      success: true,
      message: "Class created successfully",
      data: { id: result.insertId, className, branchId: parsedBranchId, year },
    });
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