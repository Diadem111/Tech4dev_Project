const express = require('express')
const router = express.Router()
const {attendance} = require("../controller")
const {userController} = require("../controller")
const {isLoggedIn, isTeacher, authMiddleware} = require("../middleware/auth")

router.get('/studentAttendance/:class', attendance.getClassStudents) //donr
router.get('/studentAbsent', attendance.getStudentsAbsentData) //done
router.get('/studentPresent', attendance.getStudentsPresentData) //done
router.post('/markAttendance',authMiddleware, attendance.markAttendance) //DONE
router.get("/alluser",authMiddleware, userController.allUserTable)
router.get("/allstudent", userController.allStudent)
router.get("/allteacher", userController.allTeacher)
router.get("/allApplicant",authMiddleware, userController.allApplicationStudent)



module.exports = router
