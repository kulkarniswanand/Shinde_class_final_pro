const pool = require("../../config/dbConfig"); // Assuming your MySQL connection is in db.js

const Student = {
  // Fetch all students
  getAllStudents: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM students", (error, results) => {
        if (error) return reject(error);
        resolve(results);
      });
    });
  },

  // Fetch a student by ID
  getStudentById: (id) => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM students WHERE id = ?", [id], (error, results) => {
        if (error) return reject(error);
        resolve(results.length > 0 ? results[0] : null);
      });
    });
  },

  // Update a student
  updateStudent: (id, studentData) => {
    return new Promise((resolve, reject) => {
      const { name, class: studentClass, branch } = studentData;
      pool.query(
        "UPDATE students SET name = ?, class = ?, branch = ? WHERE id = ?",
        [name, studentClass, branch, id],
        (error, results) => {
          if (error) return reject(error);
          resolve(results.affectedRows > 0);
        }
      );
    });
  },

  // Add a new student
  addStudent: (studentData) => {
    return new Promise((resolve, reject) => {
      const { name, class: studentClass, branch } = studentData;
      pool.query(
        "INSERT INTO students (name, class, branch) VALUES (?, ?, ?)",
        [name, studentClass, branch],
        (error, results) => {
          if (error) return reject(error);
          resolve(results.insertId);
        }
      );
    });
  },
};

module.exports = Student;
