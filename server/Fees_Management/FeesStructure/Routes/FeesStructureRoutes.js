const express = require("express");
const router = express.Router();
const FeesStructureModel = require("../Model/FeesStructureModel");

// Get all fees structures
router.get("/", async (req, res) => {
  try {
    const feesStructures = await FeesStructureModel.getAllFeesStructures();
    res.json(feesStructures);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single fees structure by ID
router.get("/:id", async (req, res) => {
  try {
    const feesStructure = await FeesStructureModel.getFeesStructureById(req.params.id);
    if (feesStructure) {
      res.json(feesStructure);
    } else {
      res.status(404).json({ error: "Fees Structure not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new fees structure
router.post("/", async (req, res) => {
  try {
    const newFeesStructureId = await FeesStructureModel.createFeesStructure(req.body);
    res.status(201).json({ id: newFeesStructureId });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update an existing fees structure
router.put("/:id", async (req, res) => {
  try {
    const affectedRows = await FeesStructureModel.updateFeesStructure(req.params.id, req.body);
    if (affectedRows > 0) {
      res.json({ message: "Fees Structure updated successfully" });
    } else {
      res.status(404).json({ error: "Fees Structure not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a fees structure
router.delete("/:id", async (req, res) => {
  try {
    const affectedRows = await FeesStructureModel.deleteFeesStructure(req.params.id);
    if (affectedRows > 0) {
      res.json({ message: "Fees Structure deleted successfully" });
    } else {
      res.status(404).json({ error: "Fees Structure not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;