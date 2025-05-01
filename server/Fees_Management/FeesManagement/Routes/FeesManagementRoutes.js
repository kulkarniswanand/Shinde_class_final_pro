const express = require("express");
const router = express.Router();
const { getAllStudentsWithFees, updateFees } = require("../Controller/FeesManagementController");

// Fetch all students with fee details
router.get("/", getAllStudentsWithFees);

// Update student fee details
router.put("/update", updateFees);

module.exports = router;
