const express = require('express');
const router = express.Router();
const examController = require('../Controller/examController');

router.post('/', examController.createExam);
router.put('/:id', examController.updateExam);
router.get('/', examController.getAllExams);
router.get('/:id', examController.getExamById);

module.exports = router;
