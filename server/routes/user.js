const express = require('express')
const router = express.Router()
const {registerUser,home, userVerifyOtp,deleteTeacherTable,deleteStudent,forgotPassword,resetPassword,
    deleteTeacher,ApplicationStudent,loginUser} = require("../controller/user");
const upload = require("../middleware/multer")

// define routes
router.get("/home", home)
router.post("/signup", upload.single("passport"),registerUser)
router.post("/verifyOtp", userVerifyOtp)
router.post("/login", loginUser)
router.post("/forgot-password",forgotPassword)
router.post("/reset-password",resetPassword )
router.get("/delete", deleteTeacherTable)
router.get("/deletestud", deleteStudent)
router.get("/deleteteac", deleteTeacher)
router.get("/find", ApplicationStudent)

module.exports = router