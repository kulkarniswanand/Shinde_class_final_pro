const express = require("express");
const router = express.Router();
const updateBranchController = require("../controllers/updateBranchController");

// Route to get all branches
router.get("/", updateBranchController.getAllBranches);

// Route to update a branch
router.put("/:id", updateBranchController.updateBranch);

module.exports = router;
