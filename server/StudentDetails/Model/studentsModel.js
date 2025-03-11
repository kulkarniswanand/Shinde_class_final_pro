const db = require("../../config/dbConfig");

// Get all students
exports.getAllStudents = async () => {
  const [rows] = await db.query("SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as dob FROM students");
  return rows;
};

// Get a single student by ID
exports.getStudentById = async (id) => {
  const [rows] = await db.query("SELECT *, DATE_FORMAT(dob, '%Y-%m-%d') as dob FROM students WHERE id = ?", [id]);
  return rows[0];
};

// Create a new student
exports.createStudent = async (name, studentClass, branch) => {
  const [result] = await db.query(
    "INSERT INTO students (name, class, branch) VALUES (?, ?, ?)",
    [name, studentClass, branch]
  );
  return result.insertId;
};

// Update a student
exports.updateStudent = async (id, studentname, address, gender, dob, parentMobile, studentMobile, email, studentClass, branch, admissionDate) => {
  const [result] = await db.query(
    `UPDATE students SET 
      studentname=?, address=?, gender=?, dob=?, 
      parentMobile=?, studentMobile=?, email=?, class=?, 
      branch=?, admissionDate=? WHERE id = ?`,
    [studentname, address, gender, dob, parentMobile, studentMobile, email, studentClass, branch, admissionDate, id]
  );

  if (result.affectedRows === 0) {
    return { error: "Student not found" };
  }

  return { message: "Student updated successfully" };
};

// Delete a student
exports.deleteStudent = async (id) => {
  await db.query("DELETE FROM students WHERE id = ?", [id]);
  return { message: "Student deleted successfully" };
};
