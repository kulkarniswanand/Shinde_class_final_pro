const Exam = require('../Model/examModel');

exports.createExam = (req, res) => {
    const examData = req.body;
    Exam.saveExam(examData, (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to save exam.' });
        res.status(201).json({ message: 'Exam created successfully', id: result.insertId });
    });
};

exports.updateExam = (req, res) => {
    const examId = req.params.id;
    const examData = req.body;
    Exam.updateExam(examId, examData, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update exam.' });
        res.json({ message: 'Exam updated successfully' });
    });
};

exports.getAllExams = (req, res) => {
    Exam.getAllExams((err, exams) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch exams.' });
        res.json(exams);
    });
};

exports.getExamById = (req, res) => {
    const examId = req.params.id;
    Exam.getExamById(examId, (err, exam) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch exam.' });
        if (!exam) return res.status(404).json({ error: 'Exam not found.' });
        res.json(exam);
    });
};
