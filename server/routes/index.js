const express = require("express")
const studentRoutes = require('./student')
const authRoutes = require("./authRoute")
const scheduleRoute = require("./classSchedule")
const assessmentRoute = require("./assessment")

const router = express.Router()

router.use('/students', studentRoutes)
router.use('/user', authRoutes)
router.use("/class-schedule",scheduleRoute )
router.use("/assessment", assessmentRoute)

module.exports = router
