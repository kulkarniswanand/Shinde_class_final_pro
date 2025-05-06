const express = require("express");
const { getDashboardData } = require("../controller/DashboardController");

const router = express.Router();

router.get("/dashboard", getDashboardData);

module.exports = router;
