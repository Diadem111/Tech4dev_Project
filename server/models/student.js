const mongoose = require('mongoose')
const { Schema } = mongoose

const StudentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    class: {
      type: String
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
