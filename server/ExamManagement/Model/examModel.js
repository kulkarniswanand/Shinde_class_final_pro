const pool = require('../../config/dbConfig');

// Save new exam
exports.saveExam = (examData, callback) => {
    const query = `INSERT INTO exams (examTitle, subject, totalMarks, passingMarks, correctAnswer) VALUES (?, ?, ?, ?, ?)`;
    const values = [examData.examTitle, examData.subject, examData.totalMarks, examData.passingMarks, JSON.stringify(examData.correctAnswer)];

    pool.query(query, values, (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

// Update existing exam
exports.updateExam = (id, examData, callback) => {
    const query = `UPDATE exams SET examTitle = ?, subject = ?, totalMarks = ?, passingMarks = ?, correctAnswer = ? WHERE id = ?`;
    const values = [examData.examTitle, examData.subject, examData.totalMarks, examData.passingMarks, JSON.stringify(examData.correctAnswer), id];

    pool.query(query, values, (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

// Get all exams
exports.getAllExams = (callback) => {
    pool.query(`SELECT * FROM exams`, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Get exam by ID
exports.getExamById = (id, callback) => {
    pool.query(`SELECT * FROM exams WHERE id = ?`, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result[0]);
    });
};
