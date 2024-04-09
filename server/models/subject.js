const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  teachers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Teacher',
    required: true
  },
  classes: {
    type: [String],
    default: []
  }
})

const Subject = mongoose.model('Subject', SubjectSchema)
module.exports = Subject
