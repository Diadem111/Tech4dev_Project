const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { userServices } = require("../services")
const { sendMail } = require("../utils/sendMail")
const { User, Teacher, Student,Application } = require('../models')
const Cloudinary = require("../middleware/cloudinary")
const { sendOTPByEmail } = require("../utils/sendMail")

const home = (req, res) => {
    res.status(200).json({
        status: "ok",
        server: " welcome to the home page",
    });
}



//   register a new user
const registerUser = async (req, res) => {
    try {
        const { role, ...userData} = req.body;
        // console.log(userData)
        const userExist = await User.findOne({
            email: userData.email,
        })
        if (userExist) {
            res.status(400).json({ message: "Email Exist!", status: false })
        }
        // check if password == to confirmpassword
        else {
            if (userData.password !== userData.confirmPassword) {
                throw new Error("Passwords do not match!")
            } else {
                if (req.file) {
                    const uploadToCloud = await Cloudinary.uploader.upload(req.file.path);
                    // console.log(uploadToCloud)

                    // upload image to cloudinary

                    if (!uploadToCloud) {
                        throw new Error("FAILED TO UPLOAD TO CLOUD")
                    }
                    let imgLink = uploadToCloud.url


                     //    generation of verification otp
                     const verifyOtp = Math.floor(3000 + Math.random() * 5000).toString() // Generate a 4-digit OTP
                     const expireOtp = new Date();
                     expireOtp.setTime(expireOtp.getTime() + (30 * 60 * 1000));  //set expire time to 30 minutsees
 
                    // create new instance of user
                    const newUser = new User({
                        ...userData,
                        passport: imgLink,
                        otp: verifyOtp,   
                        otpExpiry: expireOtp,
                        // address: {userDataaddress}
                    })


                    // save the user to the database
                    await newUser.save()

                    // send OTP by sendMail\
                    const subject = "Welcome to SchoolBase!"
                    const htmlContent = `<h3>Dear ${userData.firstName},</h3>
                    <p>Welcome to SchoolBase! You have successfully registered as a ${role}.</p>
                    <p>Your OTP is : ${verifyOtp} , will expire in ${expireOtp}</p>
                    <p>Best Regards,</p>
                    <p>SCHOOLBASE team</p>`
                    await sendOTPByEmail(userData.email, subject, htmlContent)
                   
                   
                    //create new record based on role
                    let newRecord;
                    if (role === "student") {

                        // set the user id into the user as indicated in the model
                        const studentData = { user: newUser._id, ...userData }
                        const newStudent = new Student({
                            ...studentData,
                            role: role,
                           

                        })
                        newRecord = await newStudent.save()
                        res.status(200).json({message:"success", newRecord})

                    } else if (role === "teacher") {
                        const teacherData = { user: newUser._id, ...userData }
                        const newTeacher = new Teacher({
                            ...teacherData,
                            role: role,
                            class: {list: userData.class},
                            subjectsTaught: {list: userData.subjectsTaught},
                            

                        })
                        newRecord = await newTeacher.save()
                        res.status(200).json({message:"success", newRecord})
                    } else {
                        res.status(400).json({message:"Role Invalid"})
                    }

                             }

            }
        }   
    } catch (err) {
        res.status(501).json({ error: err.message })

    }
}


const userVerifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;

        const result = await userServices.verifyOTP(otp)

        res.status(200).json({ message: "OTP veirfied succesfully, welcome!", result })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


// Login a student
const loginUser = async (req, res) => {
    try {
       const  {email, password }  = req.body
    const result = await userServices.LoginUser({email, password})
    console.log(result)
    res.status(200).json({message: "Login successful", result, status:true})
    
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message })
    }
  }


//   forgot password 
const forgotPassword = async (req,res) => {
try {
      const {email} = req.body;
      const data = await userServices.forgetPassword({email})
      res.status(200).json({message:"password sent to your email"})

}catch(error){
    res.status(501).json({error:error.message})
}
}

// reset password
const resetPassword = async (req,res) => {
    try {
        // console.log(req.body)
        const data = await userServices.resetPassword(req.body)
        res.status(200).json({message:"password reset successful"})
    }catch(err){
        res.status(501).json({error:err.message})
    }
}


// get dashboard based on authorization from headers
const getdashBoard = async (req,res) => {
    try {
        // console.log(req)
 const result = await userServices.getDashboard(req)
 res.status(200).json({message:"welcome User", result, status:true})

    }catch(err){
        res.status(501).json({error:err.message})
    }
}
  const deleteTeacherTable = async (req, res) => {
    try {
        // Delete the TeacherTable collection
        const result = await User.find({});
        res.status(200).json({ message: 'TeacherTable deleted successfully', result });
    } catch (error) {
        console.error('Error deleting TeacherTable:', error);
        res.status(500).json({ message: 'An error occurred while deleting TeacherTable' });
    }
};

const deleteTeacher = async (req, res) => {
    try {
        // Delete the TeacherTable collection
        const result = await Teacher.find({});
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
        res.status(200).json({ message: 'TeacherTable deleted successfully', result });
    } catch (error) {
        console.error('Error deleting TeacherTable:', error);
        res.status(500).json({ message: 'An error occurred while deleting TeacherTable' });
    }
};

const ApplicationStudent = async (req, res) => {
    try {
        // Delete the TeacherTable collection
        const result = await Application.find();
        res.status(200).json({ message: 'TeacherTable deleted successfully', result });
    } catch (error) {
        console.error('Error deleting TeacherTable:', error);
        res.status(500).json({ message: 'An error occurred while deleting TeacherTable' });
    }
};




module.exports = { home, registerUser, userVerifyOtp,loginUser,forgotPassword,resetPassword,getdashBoard,
     deleteTeacherTable, deleteStudent, deleteTeacher,ApplicationStudent }