const attendanceModel = require('../Model/studentAttendanceModel');

// Fetch all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await attendanceModel.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};
 
// Save attendance
exports.markAttendance = async (req, res) => {
  try {
    const { studentId, name, studentClass, branch, status, date } = req.body;

    if (!studentId || !name || !studentClass || !branch || !status) {
      return res.status(400).json({ message: 'studentId, name, class, branch, and status are required' });
    }

    await attendanceModel.saveAttendance(studentId, name, studentClass, branch, date, status);
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Error marking attendance', error: error.message });
  }
};

// Get all attendance
exports.getAllAttendance = async (req, res) => {
  try {
    const data = await attendanceModel.getAllAttendance();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ message: 'Error fetching attendance', error: error.message });
  }
};

// Get attendance by date range (and optionally class name)
exports.getAttendanceByDateRange = async (req, res) => {
  try {
    const { startDate, endDate, className } = req.query; // className is optional

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'startDate and endDate parameters are required' });
    }

    // Pass className (which can be undefined) to the model function
    const data = await attendanceModel.getAttendanceByDateRange(startDate, endDate, className);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching attendance by date range:', error);
    res.status(500).json({ message: 'Error fetching attendance by date range', error: error.message });
  }
};

// Get attendance by student ID
exports.getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const data = await attendanceModel.getAttendanceByStudent(studentId);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching student attendance:', error);
    res.status(500).json({ message: 'Error fetching student attendance', error: error.message });
  }
};

// Get distinct classes for attendance module
exports.getDistinctClasses = async (req, res) => {
  try {
    const classes = await attendanceModel.getDistinctClasses();
    res.status(200).json(classes); // Send as an array of strings
  } catch (error) {
    console.error('Error fetching distinct classes:', error);
    res.status(500).json({ message: 'Error fetching distinct classes', error: error.message });
  }
};
 