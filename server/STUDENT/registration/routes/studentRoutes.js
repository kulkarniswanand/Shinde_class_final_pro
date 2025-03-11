const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Get all students
router.get("/studentDetails", studentController.getAllStudents);

// Get a student by ID
router.get("/studentDetails/:id", studentController.getStudentById);

// Update a student
router.put("/studentDetails/:id", studentController.updateStudent);

// Add a new student
router.post("/studentDetails", studentController.addStudent);

module.exports = router;
