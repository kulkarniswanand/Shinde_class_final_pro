const express = require('express');
const { createBranch } = require('../BRANCH_MANAGEMENT/controllers/authController');
const router = express.Router();

// Route to create a new branch
router.post('/branch', createBranch);

module.exports = router;
