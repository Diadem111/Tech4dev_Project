const mongoose = require('mongoose')

const AssessmentRecordSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true
  },
  responses: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    choice: String
  }],
  marksObtained: Number, // This will be updated after marking
  marksObtainable: Number, // This will be gotten from the assessment
  dateSubmitted: Date,
  feedback: String
}, { timestamps: true })

const AssessmentRecord = mongoose.model('AssessmentRecord', AssessmentRecordSchema)
module.exports = AssessmentRecord
