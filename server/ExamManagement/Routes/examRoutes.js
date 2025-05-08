const express = require('express');
const router = express.Router();
const examController = require('../Controller/examController');

router.post('/', examController.createExam);
router.put('/:id', examController.updateExam);
router.get('/', examController.getAllExams);
router.get('/:id', examController.getExamById);
router.delete('/:id', examController.deleteExam); // Add delete route
router.post('/submit-answers', examController.submitExamAnswers);

module.exports = router;
