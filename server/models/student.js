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
     dateOfBirth: {
      type: Date
    },
      religion: {
      type: String
    },
    stateOfOrigin: {
      type: String
    },
    nationality: {
      type: String
    },
    maritalStatus: {
      type: String,
      enum: ['single', 'married', 'widowed']
    },
    parentName: String,
    parentOccupation:String,
    // guardianName: String,
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
    recommedationLetter:{
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
