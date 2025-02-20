const express = require("express");
const router = express.Router();
const { getBranches, deleteBranch } = require("../controllers/deleteBranchController");

router.get("/", getBranches); // Fetch all branches
router.delete("/:id", deleteBranch); // Delete a branch

module.exports = router;
