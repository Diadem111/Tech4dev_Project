const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  role: {
    type: String,
    enum: ['super', 'admin'],
    default: 'staff'
  }
})

const Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin
