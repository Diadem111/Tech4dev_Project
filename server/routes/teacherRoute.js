const express = require('express')
const router = express.Router()
const {attendance} = require("../controller")

router.get('/studentAttendance/:class', attendance.getClassStudents)
router.get('/studentAbsent', attendance.getStudentsAbsentData)
router.get('/studentPresent', attendance.getStudentsPresentData)
router.post('/markAttendance', attendance.markAttendance)


module.exports = router
