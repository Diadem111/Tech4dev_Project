const {userServices} = require("../services")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {newApplicant} = require("../services")



const newApplicantSystem =async  (req,res) => {
try {
    // console.log(req.body)
    // console.log(req.files)

    const requestFiles = req.files; // retrieve multiple files
     
     const newStudent = await newApplicant.createStudentService(req.body, requestFiles)
       return res.status(201).json({newStudent})

}
catch (err){
    res.status(501).send({error:err.message})
}
}


module.exports = {
    newApplicantSystem
}
