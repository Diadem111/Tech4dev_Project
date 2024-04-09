const express = require('express')
const router = express.Router()
const {registerUser,home} = require("../controller/user");
const upload = require("../middleware/multer")
// define routes
router.get("/home", home)
router.post("/signup", upload.single("file"),registerUser)

module.exports = router