// Route to handle questions and assessment creation
const express = require('express')
const router = express.Router()
const { assessment } = require('../controller')

// Define routes

// Questions
router.post('/question', assessment.createQuestion)
router.post('/add-question/:id', assessment.addQuestionsToAssessment)
router.get('/question/:id', assessment.getQuestionById)
router.get('/question/filter', assessment.getQuestionByFilter)
router.get('/question/:class', assessment.getQuestionsByClass)

// Assessment
router.post('/create', assessment.createAssessment)
router.put('/set-mark/:id', assessment.setAssessmentTotalMarks)
router.get('/:id', assessment.getAssessment)

// Assessment recording and grading
router.post('/:id/create-record', assessment.createAssessmentRecord)
router.get('/record/:id', assessment.getAssessmentRecordById)
router.get('/:studentId/record', assessment.getAssessmentRecordByStudentId)
router.put('/mark/:id', assessment.markAssessment)
router.get('/responses/:studentId', assessment.getStudentsResponsesAndCorrectAnswer)

module.exports = router
