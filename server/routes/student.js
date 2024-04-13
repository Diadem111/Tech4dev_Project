const express = require('express')
const router = express.Router()
const {newApplicantSystem} = require("../controller/newApplicant");
const upload = require("../middleware/multer")


// route for uploading files
router.post("/upload", upload.fields([{name:'passport',maxCount: undefined},
 {name:'recommedationLetter', maxCount: undefined},
 {name:"signature", maxCount:undefined},
 {name:"additionalDocuments", maxCount:undefined}
]), newApplicantSystem)
module.exports = router