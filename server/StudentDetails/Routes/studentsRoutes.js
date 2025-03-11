const express = require("express");
const router = express.Router();
const { getAllStudents, updateStudent } = require("../Controller/studentsController");

// ...existing code...
router.get("/", getAllStudents);
router.put("/studentDetails/:id", updateStudent);

// ...existing code...

module.exports = router;
