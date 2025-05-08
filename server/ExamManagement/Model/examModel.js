const pool = require('../../config/dbConfig');

// Save new exam and its questions
exports.saveExam = async (examData) => {
    const query = `INSERT INTO exams (name, subject, standard, date, duration, status, total_marks) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [examData.name, examData.subject, examData.standard, examData.date, examData.duration, 'upcoming', examData.totalMarks];

    const [result] = await pool.query(query, values);
    const examId = result.insertId; // Get the ID of the newly created exam

    // Check if questions exist and are valid
    if (examData.questions && examData.questions.length > 0) {
        const questionQuery = `INSERT INTO questions (exam_id, type, question, options, correct_answer, marks) VALUES ?`;
        const questionValues = examData.questions.map((q) => [
            examId, // Use the correct exam_id
            q.type,
            q.question,
            JSON.stringify(q.options || []), // Ensure options are stored as JSON
            q.correctAnswer || null, // Handle null values for correctAnswer
            q.marks || 0, // Default marks to 0 if not provided
        ]);

        await pool.query(questionQuery, [questionValues]);
    }

    return result;
};

// Update existing exam
exports.updateExam = async (id, examData) => {
    const query = `UPDATE exams SET name = ?, subject = ?, standard = ?, date = ?, duration = ?, total_marks = ? WHERE id = ?`;
    const values = [examData.name, examData.subject, examData.standard, examData.date, examData.duration, examData.totalMarks, id];

    const [result] = await pool.query(query, values);
    return result;
};

// Get all exams with their questions
exports.getAllExams = async () => {
    const query = `
        SELECT e.id, e.name, e.subject, e.standard, e.date, e.duration, e.status, e.total_marks,
               JSON_ARRAYAGG(
                   JSON_OBJECT(
                       'id', q.id,
                       'type', q.type,
                       'question', q.question,
                       'options', q.options,
                       'correctAnswer', q.correct_answer,
                       'marks', q.marks
                   )
               ) AS questions
        FROM exams e
        LEFT JOIN questions q ON e.id = q.exam_id
        GROUP BY e.id
        ORDER BY e.date ASC
    `;
    const [results] = await pool.query(query);
    return results;
};

// Get exam by ID
exports.getExamById = async (id) => {
    const query = `
        SELECT e.*, 
               JSON_ARRAYAGG(
                   JSON_OBJECT(
                       'id', q.id,
                       'type', q.type,
                       'question', q.question,
                       'options', q.options,
                       'correctAnswer', q.correct_answer,
                       'marks', q.marks
                   )
               ) AS questions
        FROM exams e
        LEFT JOIN questions q ON e.id = q.exam_id
        WHERE e.id = ?
        GROUP BY e.id
    `;

    const [results] = await pool.query(query, [id]);
    return results[0];
};

// Delete exam and its questions
exports.deleteExam = async (id) => {
    const deleteQuestionsQuery = `DELETE FROM questions WHERE exam_id = ?`;
    const deleteExamQuery = `DELETE FROM exams WHERE id = ?`;

    await pool.query(deleteQuestionsQuery, [id]);
    const [result] = await pool.query(deleteExamQuery, [id]);
    return result;
};

// Save exam answers
exports.saveExamAnswers = async (answersData) => {
    const query = `INSERT INTO exam_answers (exam_id, question_id, student_id, answer, is_correct, marks_obtained) VALUES ?`;
    const values = answersData.map((answer) => [
        answer.examId,
        answer.questionId,
        answer.studentId,
        answer.answer,
        answer.isCorrect,
        answer.marksObtained,
    ]);

    const [result] = await pool.query(query, [values]);
    return result;
};

// Update exam status
exports.updateExamStatus = async (id, status) => {
    const query = `UPDATE exams SET status = ? WHERE id = ?`;
    const values = [status, id];
    const [result] = await pool.query(query, values);
    return result;
};
