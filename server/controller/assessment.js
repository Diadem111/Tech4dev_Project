const { assessmentService } = require('../services')

// Question controllers
const createQuestion = async (req, res) => {
  try {
    const question = await assessmentService.createQuestion(req.body)
    return res.status(201).json({
      message: 'success',
      data: question
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

const getQuestionById = async (req, res) => {
  try {
    const question = await assessmentService
      .getQuestionById(
        req.params.id
      )
    return res.status(200).json(question)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

const getQuestionsByClass = async (req, res) => {
  try {
    const questions = await assessmentService.getQuestionsByClass(req.body)
    return res.status(200).json(questions)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

const getQuestionByFilter = async (req, res) => {
  try {
    const questions = await assessmentService.getQuestionByFilter(req.body)
    return res.status(200).json(questions)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

// Assessment controllers
const createAssessment = async (req, res) => {
  try {
    const assessmentData = req.body
    const assessment = await assessmentService.createAssessment(assessmentData)
    return res.status(201).json({
      message: 'successfully created assessment', data: assessment
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

const getAssessment = async (req, res) => {
  try {
    const assessment = await assessmentService.getAssessment(req.params.id)
    return res.status(200).json(assessment)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

const addQuestionsToAssessment = async (req, res) => {
  try {
    const assessment = await assessmentService.addQuestionsToAssessment(
      req.params.id,
      req.body
    )
    return res.status(200).json({
      message: 'Question added!',
      data: assessment
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

const updateAssessment = async (req, res) => {
  try {
    const updatedAssessment = await assessmentService.updateAssessment(
      req.params.id,
      req.body
    )
    return res.status(201).json({
      message: 'Assessment updated successfully',
      assessment: updatedAssessment
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

const setAssessmentTotalMarks = async (req, res) => {
  try {
    const assessment = await assessmentService
      .getAssessment(
        req.params.id
      )
    await assessmentService.setAssessmentTotalMarks(assessment)
    return res.status(201).json({
      message: 'Assessment total marks updated successfully',
      assessmentData: assessment
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

// Assessment record
const createAssessmentRecord = async (req, res) => {
  try {
    const assessmentRecord = await assessmentService
      .createAssessmentRecord(
        req.params.id,
        req.body
      )
    return res.status(201).json({
      message: 'AssessmentRecord created successfully!',
      assessmentRecordData: assessmentRecord
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

const getAssessmentRecordById = async (req, res) => {
  try {
    const assessmentRecord = await assessmentService
      .getAssessmentRecordById(req.params.id)
    return res.status(200).json(assessmentRecord)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

const getAssessmentRecordByStudentId = async (req, res) => {
  try {
    const assessmentRecord = await assessmentService
      .getAssessmentRecordByStudentId(req.params.studentId)
    return res.status(200).json(assessmentRecord)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

const markAssessment = async (req, res) => {
  try {
    const assessmentRecord = await assessmentService
      .markAssessment(req.params.id)
    return res.status(200).json(assessmentRecord)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getStudentsResponsesAndCorrectAnswer = async (req, res) => {
  try {
    const studentResponseAndAnswer = await assessmentService
      .getStudentsResponsesAndCorrectAnswer(
        req.params.studentId
      )
    return res.status(200).json(studentResponseAndAnswer)
  } catch (error) {
    return res.status(500).json({
      error: error.message
    })
  }
}

module.exports = {
  createQuestion,
  getQuestionById,
  getQuestionsByClass,
  getQuestionByFilter,
  createAssessment,
  getAssessment,
  addQuestionsToAssessment,
  updateAssessment,
  setAssessmentTotalMarks,
  createAssessmentRecord,
  getAssessmentRecordById,
  markAssessment,
  getAssessmentRecordByStudentId,
  getStudentsResponsesAndCorrectAnswer
}
