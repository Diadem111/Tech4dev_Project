const express = require('express')
const router = express.Router()
const {registerUser,home, userVerifyOtp,deleteTeacherTable,deleteStudent,deleteTeacher} = require("../controller/user");
const upload = require("../middleware/multer")

// define routes
router.get("/home", home)
router.post("/signup", upload.single("passport"),registerUser)
router.post("/verifyOtp", userVerifyOtp)
router.get("/delete", deleteTeacherTable)
router.get("/deletestud", deleteStudent)
router.get("/deleteteac", deleteTeacher)

module.exports = router