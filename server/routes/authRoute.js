const express = require('express')
const router = express.Router()
const {userController} = require("../controller")
const upload = require("../middleware/multer")
const {isLoggedIn, isTeacher, authMiddleware} = require("../middleware/auth")

// define routes
router.get("/home", userController.home)
router.post("/signup", upload.single("passport"),userController.registerUser)
router.post("/verifyOtp", userController.userVerifyOtp)
router.post("/login", userController.loginUser)
router.post("/forgot-password",userController.forgotPassword)
router.post("/reset-password",userController.resetPassword )
router.get("/dashboard",authMiddleware, userController.getdashBoard)

module.exports = router

//661b194855d32380f8988ea1
//bisolaola@gmail.com
//bisolaola