// Route to handle questions and assessment creation
const express = require('express')
const router = express.Router()
const { assessment } = require('../controller')

// Define routes

// Questions
router.post('/question', assessment.createQuestion) //done
router.post('/add-question/:id', assessment.addQuestionsToAssessment) //done
router.get('/question/:id', assessment.getQuestionById) //done
router.get('/questionByFilter', assessment.getQuestionByFilter) //done
router.get('/questionByClass', assessment.getQuestionsByClass) //done

// Assessment
router.post('/create', assessment.createAssessment) //done
router.put('/set-mark/:id', assessment.setAssessmentTotalMarks) //done
router.get('/:id', assessment.getAssessment) //done

// Assessment recording and grading
router.post('/:id/create-record', assessment.createAssessmentRecord)
router.get('/record/:id', assessment.getAssessmentRecordById)
router.get('/:studentId/record', assessment.getAssessmentRecordByStudentId)
router.put('/mark/:id', assessment.markAssessment)
router.get('/responses/:studentId', assessment.getStudentsResponsesAndCorrectAnswer)

module.exports = router


//662402f6c01440b8ff5d2d6f
