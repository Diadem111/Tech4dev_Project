const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userServices} = require("../services")
const {sendMail} = require("../utils/sendMail")
const { User, Teacher, Student } = require('../models')

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


const userVerifyOtp = async (req, res) => {
 try {
    const { otp } = req.body;

    const result = await userServices.verifyOTP(otp)

    res.status(200).json({message:"OTP veirfied succesfully, welcome!", result})
 }catch(err){
    res.status(400).json({error:err.message})
 }
}


const deleteTeacherTable = async (req, res) => {
    try {
        // Delete the TeacherTable collection
        const result = await User.find(); 
        res.status(200).json({ message: 'TeacherTable deleted successfully', result });
    } catch (error) {
        console.error('Error deleting TeacherTable:', error);
        res.status(500).json({ message: 'An error occurred while deleting TeacherTable' });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        // Delete the TeacherTable collection
         const result = await Teacher.find(); 
        res.status(200).json({ message: 'TeacherTable deleted successfully', result });
    } catch (error) {
        console.error('Error deleting TeacherTable:', error);
        res.status(500).json({ message: 'An error occurred while deleting TeacherTable' });
    }
};

const deleteStudent = async (req, res) => {
    try {
        // Delete the TeacherTable collection
         const result = await Student.find({}); 
        res.status(200).json({ message: 'TeacherTable deleted successfully',result });
    } catch (error) {
        console.error('Error deleting TeacherTable:', error);
        res.status(500).json({ message: 'An error occurred while deleting TeacherTable' });
    }
};



module.exports = {home,registerUser,  userVerifyOtp,deleteTeacherTable,deleteStudent,deleteTeacher}