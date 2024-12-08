const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authControllers");

// Login route
router.post("/login", loginUser);

module.exports = router;
