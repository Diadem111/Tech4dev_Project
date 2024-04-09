const mongoose = require('mongoose')
const mongodb_url =  process.env.MONGODB_URI
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongodb_url)
    console.log(`Database Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1) // Exit process with failure
  }
}

module.exports = connectDB
