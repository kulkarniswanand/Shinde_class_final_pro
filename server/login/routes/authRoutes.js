const express = require('express');
const { login, resetPassword } = require('../controllers/authController');
const router = express.Router();

// Login route
router.post('/login', login);

// Password reset route
router.post('/reset-password', resetPassword);

module.exports = router;
