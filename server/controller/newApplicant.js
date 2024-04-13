const {userServices} = require("../services")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {newApplicant} = require("../services")



const newApplicantSystem =async  (req,res) => {
try {
    // console.log(req.files)
    // console.log(req.body)
    // const {appli } = req.body;
    const requestFiles = req.files; // retrieve multiple files
     
     const newStudent = await newApplicant.createStudentService(req.body, requestFiles)
        res.status(201).json({success:true, data:newStudent})

}
catch (err){
    res.status(501).json({error:err.message})
}
}


module.exports = {
    newApplicantSystem
}
