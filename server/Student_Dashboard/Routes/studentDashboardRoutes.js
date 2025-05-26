const express = require("express");
const router = express.Router();
const studentDashboardController = require("../Controller/studentDashboardController");

router.post("/update-profile", studentDashboardController.updateProfile);
router.get("/get-profile/:username", studentDashboardController.getProfile);

module.exports = router;
