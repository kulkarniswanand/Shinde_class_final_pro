const express = require('express');
const { createBranch } = require('../controllers/authController');
const router = express.Router();

// Route to create a new branch
router.post('/', createBranch);

module.exports = router;
