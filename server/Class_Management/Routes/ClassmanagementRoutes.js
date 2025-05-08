const express = require("express");
const router = express.Router();
const ClassController = require("../Controller/ClassmanagementController");

// Route to fetch all classes
router.get("/getclass", ClassController.getAllClasses);

// Route to create a new class
router.post("/", ClassController.createClass);

// Route to update a class
router.put("/:id", ClassController.updateClass);

// Route to delete a class
router.delete("/:id", ClassController.deleteClass);

module.exports = router;
