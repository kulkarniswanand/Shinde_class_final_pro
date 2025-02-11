const express = require("express");
const { getBranches, updateBranch } = require("../controllers/updateBranchController");

const router = express.Router();

// Route to get all branches
router.get("/", getBranches);

// Route to update a branch by ID
router.put("/:id", updateBranch);

module.exports = router;
