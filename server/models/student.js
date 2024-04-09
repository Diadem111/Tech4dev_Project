const mongoose = require('mongoose')
const { Schema } = mongoose

const StudentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    studentId: {
      type: String,
      // required: true,
      unique: true,
      index: true
    },
    parentName: String,
    guardianName: String,
    class: {
      type: String
    },
    extracurricular: {
      list: [String]
    },
    interests: {
      list: [String]
    },
    skills: {
      list: [String]
    },
    previousSchools: {
      list: [String]
    },
    additionalDocuments: {
      list: [String]
    },
    signature: {
      list: [String]
    },
    isAdmitted: {
      type: Boolean,
      default: false
    },
    registeredCourses: {
      list: [String]
    },
    dateAdmitted: {
      type: Date
    },
    role: {
      type: String,
      default: 'student'
    },
    attendance: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }]
    }
  },

  { timestamps: true }
)

const Student = mongoose.model('students', StudentSchema)

module.exports = Student
