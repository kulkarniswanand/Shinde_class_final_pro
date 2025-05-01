const express = require('express');
const router = express.Router();
const studentAttendanceController = require('../Controller/studentAttendanceController');

// Get all students
router.get('/students', studentAttendanceController.getAllStudents);

// Save attendance for a student
router.post('/mark', studentAttendanceController.markAttendance);

// Get all attendance records
router.get('/records', studentAttendanceController.getAllAttendance); 

// Get attendance by student ID
router.get('/student/:id', studentAttendanceController.getAttendanceByStudent);

// Get attendance by date (and optionally by class)
router.get('/byDate', studentAttendanceController.getAttendanceByDate);

module.exports = router;
