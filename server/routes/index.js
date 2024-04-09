const express = require("express")
const studentRoutes = require('./student')
const userRoutes = require("./user")

const router = express.Router()

router.use('/students', studentRoutes)
router.use('/user', userRoutes)

module.exports = router
