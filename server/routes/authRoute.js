const express = require('express')
const router = express.Router()
const {userController} = require("../controller")
const upload = require("../middleware/multer")

// define routes
router.get("/home", userController.home)
router.post("/signup", upload.single("passport"),userController.registerUser)
router.post("/verifyOtp", userController.userVerifyOtp)
router.post("/login", userController.loginUser)
router.post("/forgot-password",userController.forgotPassword)
router.post("/reset-password",userController.resetPassword )
router.get("/dashboard", userController.getdashBoard)
router.get("/delete", userController.deleteTeacherTable)
router.get("/deletestud", userController.deleteStudent)
router.get("/deleteteac", userController.deleteTeacher)
router.get("/find", userController.ApplicationStudent)

module.exports = router