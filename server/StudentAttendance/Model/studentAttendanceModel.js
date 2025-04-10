const pool = require('../../config/dbConfig'); // Assuming you export your MySQL pool from this file

// Fetch all students from the "students" table
exports.getAllStudents = async () => {
  try {
    const sql = 'SELECT id, studentname AS name, class, branch FROM teachtrack.students';
    const [rows] = await pool.query(sql);
    return rows || [];
  } catch (error) {
    console.error('Error fetching students:', error);
    return []; // Return empty array on error
  }
};

// Save attendance in the "attendance" table with correct date format
exports.saveAttendance = async (studentId, name, studentClass, branch, date, status) => {
  try {
    // Convert the incoming ISO date string (UTC) into YYYY-MM-DD HH:MM:SS format in IST (UTC+5:30)
    let formattedDate;
    try {
      const dateObjUTC = new Date(date); // Create Date object from ISO string (represents UTC time)

      // Calculate IST by adding 5 hours and 30 minutes (in milliseconds)
      const istOffsetMilliseconds = (5 * 60 + 30) * 60 * 1000;
      const dateObjIST = new Date(dateObjUTC.getTime() + istOffsetMilliseconds);

      // Pad single digits with leading zero
      const pad = (num) => num.toString().padStart(2, '0');

      // Extract components from the *IST* date object using UTC methods
      // because the object's internal time value is adjusted, but we want the raw values
      // corresponding to the adjusted time.
      const year = dateObjIST.getUTCFullYear();
      const month = pad(dateObjIST.getUTCMonth() + 1); // Months are 0-indexed
      const day = pad(dateObjIST.getUTCDate());
      const hours = pad(dateObjIST.getUTCHours());
      const minutes = pad(dateObjIST.getUTCMinutes());
      const seconds = pad(dateObjIST.getUTCSeconds());

      formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } catch (parseError) {
        console.error("Error parsing date for formatting:", parseError);
        // Fallback to current server time if parsing failed unexpectedly
        const now = new Date();
        const pad = (num) => num.toString().padStart(2, '0');
        formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }

    // Use promise-based query
    const sql = 'INSERT INTO teachtrack.attendance (id, name, class, branch, date, status) VALUES (?, ?, ?, ?, ?, ?)';
    console.log('Executing SQL with formatted date:', sql, [studentId, name, studentClass, branch, formattedDate, status]); // Log the formatted date

    const [result] = await pool.query(sql, [studentId, name, studentClass, branch, formattedDate, status]);
    return result;
  } catch (error) {
    console.error('Error saving attendance:', error); // Log the full error object
    throw error;
  }
};

// Get all attendance
exports.getAllAttendance = async () => {
  try {
    const sql = 'SELECT id, name, class, branch, date, status FROM teachtrack.attendance ORDER BY date DESC';
    const [rows] = await pool.query(sql);
    return rows || [];
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return []; // Return empty array on error
  }
};

// Get attendance for a specific student
exports.getAttendanceByStudent = async (studentId) => {
  try {
    const sql = 'SELECT * FROM teachtrack.attendance WHERE id = ? ORDER BY date DESC';
    const [rows] = await pool.query(sql, [studentId]);
    return rows || [];
  } catch (error) {
    console.error('Error fetching student attendance:', error);
    return []; // Return empty array on error
  }
};
