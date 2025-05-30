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

// Controller function to create an exam announcement (scheduled exam without questions)
exports.createExamAnnouncement = async (req, res) => {
    try {
        const examData = req.body; // Expect basic exam details: name, subject, standard, date, duration, totalMarks
        // Ensure status is 'upcoming' and no questions are processed here
        const result = await Exam.saveExamAnnouncement(examData);
        res.status(201).json({ message: 'Exam announcement scheduled successfully', id: result.insertId });
    } catch (err) {
        console.error("Error creating exam announcement:", err);
        res.status(500).json({ error: 'Failed to schedule exam announcement.' });
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
        const { standard } = req.query; // Get the standard from query parameters
        const exams = await Exam.getAllExams(standard); // Pass standard to the model function
        res.json(exams);
        console.log("Fetching exams for standard:", standard || "all");
    } catch (err) {
        console.error("Error fetching exams:", err);
        res.status(500).json({ error: 'Failed to fetch exams.' });
    }
};

exports.getExamById = async (req, res) => {
    try {
        const examId = req.params.id;
        const exam = await Exam.getExamByIdWithAnswers(examId); // Use the updated model method
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
        const examId = answersData[0]?.examId; // Get the exam ID from the first answer

        if (!examId || answersData.length === 0) {
            console.error("Invalid answers data:", answersData); // Debugging log
            return res.status(400).json({ error: "Invalid answers data" });
        }

        console.log("Received answers data:", answersData); // Debugging log

        // Calculate marks_obtained for each answer
        const updatedAnswers = answersData.map((answer) => ({
            ...answer,
            marksObtained: answer.isCorrect ? answer.marks : 0, // Assign marks if correct, else 0
        }));

        console.log("Updated answers with marks:", updatedAnswers); // Debugging log

        // Save the answers
        await Exam.saveExamAnswers(updatedAnswers);

        // Calculate total score for the exam
        const totalScore = updatedAnswers.reduce((sum, answer) => sum + answer.marksObtained, 0);

        console.log("Total score calculated:", totalScore); // Debugging log

        // Update the exam status to "completed" and save the total score
        if (examId) {
            await Exam.updateExamStatusAndScore(examId, "completed", totalScore);
        }

        res.status(201).json({ message: "Exam answers submitted successfully and exam marked as completed" });
    } catch (err) {
        console.error("Error submitting exam answers:", err);
        res.status(500).json({ error: "Failed to save exam answers." });
    }
};

exports.updateExamStatus = async (req, res) => {
    try {
        const examId = req.params.id;
        const { status } = req.body; // Expect status in the request body
        await Exam.updateExamStatus(examId, status);
        res.json({ message: 'Exam status updated successfully' });
    } catch (err) {
        console.error("Error updating exam status:", err);
        res.status(500).json({ error: 'Failed to update exam status.' });
    }
};
