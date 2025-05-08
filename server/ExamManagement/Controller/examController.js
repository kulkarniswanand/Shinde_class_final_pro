const Exam = require('../Model/examModel');

exports.createExam = async (req, res) => {
    try {
        const examData = req.body; // Expect exam data from the frontend
        const result = await Exam.saveExam(examData);
        res.status(201).json({ message: 'Exam created successfully', id: result.insertId });
    } catch (err) {
        console.error("Error creating exam:", err);
        res.status(500).json({ error: 'Failed to save exam.' });
    }
};

exports.updateExam = async (req, res) => {
    try {
        const examId = req.params.id;
        const examData = req.body;
        await Exam.updateExam(examId, examData);
        res.json({ message: 'Exam updated successfully' });
    } catch (err) {
        console.error("Error updating exam:", err);
        res.status(500).json({ error: 'Failed to update exam.' });
    }
};

exports.getAllExams = async (req, res) => {
    try {
        const exams = await Exam.getAllExams();
        res.json(exams);
    } catch (err) {
        console.error("Error fetching exams:", err);
        res.status(500).json({ error: 'Failed to fetch exams.' });
    }
};

exports.getExamById = async (req, res) => {
    try {
        const examId = req.params.id;
        const exam = await Exam.getExamById(examId);
        if (!exam) return res.status(404).json({ error: 'Exam not found.' });
        res.json(exam);
    } catch (err) {
        console.error("Error fetching exam:", err);
        res.status(500).json({ error: 'Failed to fetch exam.' });
    }
};

exports.deleteExam = async (req, res) => {
    try {
        const examId = req.params.id;
        await Exam.deleteExam(examId);
        res.json({ message: 'Exam deleted successfully' });
    } catch (err) {
        console.error("Error deleting exam:", err);
        res.status(500).json({ error: 'Failed to delete exam.' });
    }
};

exports.submitExamAnswers = async (req, res) => {
    try {
        const answersData = req.body; // Expect an array of answers
        await Exam.saveExamAnswers(answersData);
        res.status(201).json({ message: 'Exam answers submitted successfully' });
    } catch (err) {
        console.error("Error submitting exam answers:", err);
        res.status(500).json({ error: 'Failed to save exam answers.' });
    }
};
