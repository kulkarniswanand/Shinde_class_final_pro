const express = require("express");
const router = express.Router();
const { getStudentsWithFees, updateFees } = require("../Controller/FeesManagementController");

// Fetch all students with fee details
router.get("/", getStudentsWithFees);

// Update student fee details
router.put("/update", updateFees);

module.exports = router;
