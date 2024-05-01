const mongoose = require('mongoose')
const { Schema } = mongoose

const applicationSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    phoneNumber: {
      type: String
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

const Application = mongoose.model('applicationTable', applicationSchema)

module.exports = Application
