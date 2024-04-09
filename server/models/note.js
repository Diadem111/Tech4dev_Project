const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  classLevel: {
    type: String,
    enum: ['SS1', 'SS2', 'SS3']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  content: [String] // I might change this to object later

}, { timestamps: true })

const Note = mongoose.model('Note', NoteSchema)
module.exports = Note
