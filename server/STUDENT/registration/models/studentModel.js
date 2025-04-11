const db = require("../../../config/dbConfig");

async function addStudent(studentData) {
  const connection = await db.getConnection(); // Get a connection from the pool
  await connection.beginTransaction(); // Start a transaction

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

    // Convert all values to lowercase
    const lowerCaseName = name.toLowerCase();
    const lowerCaseAddress = address.toLowerCase();
    const lowerCaseGender = gender.toLowerCase();
    const lowerCaseParentMobile = parentMobile.toLowerCase();
    const lowerCaseStudentMobile = studentMobile.toLowerCase();
    const lowerCaseEmail = email.toLowerCase();
    const lowerCaseClass = studentClass.toLowerCase();
    const lowerCaseBranch = branch.toLowerCase();
    const lowerCaseAdmissionDate = admissionDate.toLowerCase();

    const studentSql = `
      INSERT INTO students (studentname, address, gender, dob, parentMobile, studentMobile, email, class, branch, admissionDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const studentValues = [
      lowerCaseName,
      lowerCaseAddress,
      lowerCaseGender,
      dob,
      lowerCaseParentMobile,
      lowerCaseStudentMobile,
      lowerCaseEmail,
      lowerCaseClass,
      lowerCaseBranch,
      lowerCaseAdmissionDate,
    ];

    const [studentResult] = await connection.execute(studentSql, studentValues);

    // Extract the first name for username and password
    const firstName = lowerCaseName.split(" ")[0];
    const password = `${firstName}${dob.split("-")[2]}${dob.split("-")[1]}`; // first name + day + month
    const role = "student";

    const userSql = `
      INSERT INTO users (username, password, role)
      VALUES (?, ?, ?)`;

    const userValues = [firstName, password, role];

    await connection.execute(userSql, userValues);

    await connection.commit(); // Commit the transaction

    console.log("✅ Student and user inserted successfully with ID:", studentResult.insertId);
    return studentResult;
  } catch (error) {
    await connection.rollback(); // Rollback the transaction in case of error
    console.error("❌ Error inserting student and user:", error);
    throw error; // Rethrow so the caller can handle it
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

module.exports = { addStudent };