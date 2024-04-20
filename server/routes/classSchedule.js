const express = require('express')
const router = express.Router()
const {classSchedule} = require("../controller")
const {isLoggedIn, isStudent,authMiddleware} = require("../middleware/auth")

router.get("/scheduleByClass",authMiddleware, classSchedule.getClassScheduleByClass)

// Define routes

router.get("/home", classSchedule.home) //done
router.post('/create-schedule', classSchedule.ScheduleTimeTable) //done
router.get("/weeklyschedule", classSchedule.getScheduleByCurrentWeek)//done
router.get("/schedule/:id",classSchedule.getClassScheduleById) //done
router.put("/update-schedule/:id",classSchedule.getClassScheduleByIdAndUpdate) //done
router.delete("/delete-schedule/:id",classSchedule.getClassScheduleByIdAndDelete ) //done
router.get("/all-schedule", classSchedule.getAllClassSchedule) //done
router.get("/scheduleByFilter", classSchedule.getClassScheduleByFilter)

module.exports = router

// 661bd67f23ed7ce6202fdf9f
// 661bd60d23ed7ce6202fdf99