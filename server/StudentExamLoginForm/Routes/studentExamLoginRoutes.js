const express = require("express");
const router = express.Router();
const studentExamLoginController = require("../Controller/studentExamLoginController");

// POST route to authenticate student
router.post("/login", studentExamLoginController.loginStudent);
// GET routes for dropdown options
router.get("/branches", studentExamLoginController.getAllBranches);
router.get("/classes", studentExamLoginController.getAllClasses);
// Password reset route for students
router.post("/reset-password", studentExamLoginController.resetStudentPassword);

module.exports = router;
