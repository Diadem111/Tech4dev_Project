const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userServices} = require("../services")
const {sendMail} = require("../utils/sendMail")

const home = (req, res) => {
    res.status(200).json({
        status: "ok",
        server: " welcome to the home page",
    });
  }

  
//   register a new user
const registerUser = async (req,res) => {
    try{
        // console.log(req.body)
        // console.log(req.file)
const register = await userServices.PostregisterUser(req.file,req.body)
 return res.status(201).json({
    message:"successfully signup",
    data:register
 })   
}catch (err){
        res.status(501).json({error:err.message})
        
    }
}

module.exports = {home,registerUser}