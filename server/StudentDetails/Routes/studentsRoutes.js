const express = require("express");
const router = express.Router();
const { getAllStudents, updateStudent } = require("../Controller/studentsController");

// ...existing code...

router.put("/students/:id", updateStudent);

// ...existing code...

module.exports = router;
