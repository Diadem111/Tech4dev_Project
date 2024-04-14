const express = require("express")
const studentRoutes = require('./student')
const authRoutes = require("./authRoute")
const scheduleRoute = require("./classSchedule")
const assessmentRoute = require("./assessment")
// const studentAttendance = require("./studentAttendance")
const teacherRoute = require("./teacherRoute")
const router = express.Router()

router.use('/students', studentRoutes)
router.use('/user', authRoutes)
router.use("/class-schedule",scheduleRoute )
router.use("/assessment", assessmentRoute)
router.use("/teacher", teacherRoute)


module.exports = router
