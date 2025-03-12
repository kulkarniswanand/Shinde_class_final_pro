const express = require("express");
const router = express.Router();
const FeesManagementController = require("../Controller/FeesManagementController");

// Get all students with their fee details
router.get("/", FeesManagementController.getStudentsWithFees);

// Update student fee payment
router.put("/update", FeesManagementController.updateStudentFees);

module.exports = router;
