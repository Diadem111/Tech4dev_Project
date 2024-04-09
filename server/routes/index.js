const express = require("express")
const studentRoutes = require('./student')

const router = express.Router()

router.use('/students', studentRoutes)

module.exports = router
