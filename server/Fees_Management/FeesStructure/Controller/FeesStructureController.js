const FeesStructureModel = require("../Model/FeesStructureModel");

// Get all Fees Structures
exports.getAllFeesStructures = async (req, res) => {
  try {
    const feesStructures = await FeesStructureModel.getAllFeesStructures();
    res.json(feesStructures);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fees structures", error });
  }
};

// Get a single Fees Structure by ID
exports.getFeesStructureById = async (req, res) => {
  try {
    const fee = await FeesStructureModel.getFeesStructureById(req.params.id);
    if (!fee) {
      return res.status(404).json({ message: "Fees Structure not found" });
    }
    res.json(fee);
  } catch (error) {
    res.status(500).json({ message: "Error fetching fees structure", error });
  }
};

// Create a new Fees Structure
exports.createFeesStructure = async (req, res) => {
  try {
    const feesId = await FeesStructureModel.createFeesStructure(req.body);
    res.status(201).json({ id: feesId, message: "Fees Structure added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating fees structure", error });
  }
};

// Update an existing Fees Structure
exports.updateFeesStructure = async (req, res) => {
  try {
    const updated = await FeesStructureModel.updateFeesStructure(req.params.id, req.body);
    if (updated) {
      res.json({ message: "Fees Structure updated successfully" });
    } else {
      res.status(404).json({ message: "Fees Structure not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating fees structure", error });
  }
};

// Delete a Fees Structure
exports.deleteFeesStructure = async (req, res) => {
  try {
    const deleted = await FeesStructureModel.deleteFeesStructure(req.params.id);
    if (deleted) {
      res.json({ message: "Fees Structure deleted successfully" });
    } else {
      res.status(404).json({ message: "Fees Structure not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting fees structure", error });
  }
};
