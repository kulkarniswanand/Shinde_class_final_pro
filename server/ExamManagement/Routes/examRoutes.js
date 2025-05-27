const express = require('express');
const router = express.Router();
const examController = require('../Controller/examController');

router.post('/', examController.createExam);
router.put('/:id', examController.updateExam);
router.put('/:id/status', examController.updateExamStatus);

// Handles GET /api/exams
// This route can accept a 'standard' query parameter (e.g., /api/exams?standard=8th)
// to filter exams by student standard. The filtering logic is in examController.getAllExams.
router.get('/', examController.getAllExams);

router.get('/:id', examController.getExamById);
router.delete('/:id', examController.deleteExam); // Add delete route
router.post('/submit-answers', examController.submitExamAnswers);

module.exports = router;
 