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
router.post('/:id/create-record', assessment.createAssessmentRecord) //DONE
router.get('/record/:id', assessment.getAssessmentRecordById) //doone
router.get('/:studentId/record', assessment.getAssessmentRecordByStudentId) //done
router.put('/mark/:id', assessment.markAssessment) //done
router.get('/responses/:studentId', assessment.getStudentsResponsesAndCorrectAnswer) //done

module.exports = router


//662402f6c01440b8ff5d2d6f
//6624424a8fabb698d76d6685

// student 661b185b55d32380f8988e99
// assessment 6622b1c8f1bbc7e2732197e2

//6624410f8fabb698d76d667a studentrecord