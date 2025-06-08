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
    // Input 'date' is an ISO date string from the client (UTC)
    // Convert to IST (UTC+5:30) and format as YYYY-MM-DD HH:MM:SS
    let formattedDate;
    try {
      const dateObj = new Date(date); // Parsed as UTC

      // Calculate IST by adding 5 hours and 30 minutes (in milliseconds)
      const istOffsetMilliseconds = (5 * 60 + 30) * 60 * 1000;
      const dateObjIST = new Date(dateObj.getTime() + istOffsetMilliseconds);

      // Pad single digits with leading zero
      const pad = (num) => num.toString().padStart(2, '0');

      // Extract components from dateObjIST using its local methods,
      // as its internal time value now represents the IST wall clock time.
      const year = dateObjIST.getFullYear();
      const month = pad(dateObjIST.getMonth() + 1); // getMonth() is 0-indexed
      const day = pad(dateObjIST.getDate());
      const hours = pad(dateObjIST.getHours());
      const minutes = pad(dateObjIST.getMinutes());
      const seconds = pad(dateObjIST.getSeconds());

      formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } catch (parseError) {
        console.error("Error parsing/formatting date for IST:", parseError);
        // Fallback to current server time if parsing failed unexpectedly
        const now = new Date();
        const pad = (num) => num.toString().padStart(2, '0');
        formattedDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }

    // Use promise-based query
    const sql = 'INSERT INTO teachtrack.attendance (id, name, class, branch, date, status) VALUES (?, ?, ?, ?, ?, ?)';
    console.log('Executing SQL with IST formatted date:', sql, [studentId, name, studentClass, branch, formattedDate, status]);

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
    // Dates are stored as IST. Send them as strings.
    const sql = `
      SELECT id, name, class, branch, 
             DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') as date, 
             status 
      FROM teachtrack.attendance 
      ORDER BY date DESC`;
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
    const sql = `
      SELECT id, name, class, branch, 
             DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') as date, 
             status 
      FROM teachtrack.attendance 
      WHERE id = ? 
      ORDER BY date DESC`;
    const [rows] = await pool.query(sql, [studentId]);
    return rows || [];
  } catch (error) {
    console.error('Error fetching student attendance:', error);
    return []; // Return empty array on error
  }
};

// Get attendance by date range (and optionally by class name)
exports.getAttendanceByDateRange = async (startDate, endDate, className) => {
  try {
    let sql = `
      SELECT id, name, class, branch, 
             DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') as date, 
             status 
      FROM teachtrack.attendance 
      WHERE DATE(date) >= ? AND DATE(date) <= ?`;
    
    const queryParams = [startDate, endDate];

    if (className) {
      sql += ' AND class = ?';
      queryParams.push(className);
    }

    sql += ' ORDER BY date DESC';

    const [rows] = await pool.query(sql, queryParams);
    return rows || [];
  } catch (error) {
    console.error('Error fetching attendance by date range:', error);
    return []; // Return empty array on error
  }
};

// Get distinct class names from the students table
exports.getDistinctClasses = async () => {
  try {
    // Assuming 'class' column stores the standard/class name
    // Order them, perhaps numerically if they contain numbers, then alphabetically
    const sql = "SELECT DISTINCT class FROM teachtrack.students ORDER BY CAST(REGEXP_SUBSTR(class, '^[0-9]+') AS UNSIGNED), class";
    const [rows] = await pool.query(sql);
    return rows.map(row => row.class) || []; // Return an array of class name strings
  } catch (error) {
    console.error('Error fetching distinct classes:', error);
    return [];
  }
};
