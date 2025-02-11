const db = require('../../../config/dbConfig');

async function addStudent(studentData) {
  try {
    const {
      name,
      address,
      gender,
      dob,
      parentMobile,
      studentMobile,
      email,
      class: studentClass,
      branch,
      admissionDate,
    } = studentData;

    const sql = `
      INSERT INTO students (studentname, address, gender, dob, parentMobile, studentMobile, email, class, branch, admissionDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [name, address, gender, dob, parentMobile, studentMobile, email, studentClass, branch, admissionDate];

    const [result] = await db.execute(sql, values);
    return result;
  } catch (error) {
    console.error("❌ Error inserting student:", error);
    throw error;
  }
}

module.exports = { addStudent };
