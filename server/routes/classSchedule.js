const express = require('express')
const router = express.Router()
const {classSchedule} = require("../controller")
const {isLoggedIn, isStudent} = require("../middleware/auth")

router.get("/all-schedule",isLoggedIn, classSchedule.getClassScheduleByClass)

// Define routes

router.post('/schedule', classSchedule.ScheduleTimeTable)
router.get("/weeklyschedule", classSchedule.getScheduleByCurrentWeek)
router.get("/schedule/:id",classSchedule.getClassScheduleById)
router.put("/update-schedule/:id",classSchedule.getClassScheduleByIdAndUpdate)
router.delete("/delete-schedule/:id",classSchedule.getClassScheduleByIdAndDelete )


module.exports = router