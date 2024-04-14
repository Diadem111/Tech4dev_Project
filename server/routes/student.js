const express = require('express')
const router = express.Router()
const {newApplicant} = require("../controller");
const upload = require("../middleware/multer")


// route for uploading files
router.post("/upload", upload.fields([{name:'passport',maxCount: undefined},
 {name:'recommedationLetter', maxCount: undefined},
 {name:"signature", maxCount:undefined},
 {name:"additionalDocuments", maxCount:undefined}
]),newApplicant.newApplicantSystem)
module.exports = router