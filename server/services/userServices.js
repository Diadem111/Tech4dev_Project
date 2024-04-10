const { User, Teacher, Student } = require('../models')
const path = require("path")
const Cloudinary = require("../middleware/cloudinary")
const multer = require("multer")
const { sendOTPByEmail } = require("../utils/sendMail")



const PostregisterUser = async (requestFile, requestUser) => {
    const { role, ...userData } = requestUser

    let imgLink;

    //    generation of verification otp
    const verifyOtp = Math.floor(3000 + Math.random() * 5000).toString() // Generate a 4-digit OTP
    const expireOtp = new Date();
    expireOtp.setTime(expireOtp.getTime() + (30 * 60 * 1000));  //set expire time to 30 minutsees



    try {
        // check if the email/user exist
        const userExist = await User.findOne({
            email: requestUser.email,
        })
        if (userExist) {
            throw new Error("Email exist!")
        }


        // check if password == to confirmpassword
        if (requestUser.password !== requestUser.confirmPassword) {
            throw new Error("Passwords do not match!")

        }

        // upload image to cloudinary
        const uploadToCloud = await Cloudinary.uploader.upload(requestFile.path);
        // console.log(uploadToCloud)

        if (!uploadToCloud) {
            throw new Error("FAILED TO UPLOAD TO CLOUD")
        }

        let imgLink = uploadToCloud.url

        // console.log(imgLink)


        // create new instance of user
        const newUser = new User({
            ...userData,
            file: imgLink,
            otp: verifyOtp,
            otpExpiry: expireOtp
        })


        // save the user to the database
        await newUser.save()

        // send OTP by email
        await sendOTPByEmail(requestUser.email, verifyOtp, expireOtp)

        let newRecord;
        if (role === "student") {

            // set the user id into the user as indicated in the model
            const studentData = { user: newUser._id, ...userData }
            const newStudent = new Student({
                ...studentData,
                role: role
            })
            newRecord = await newStudent.save()

        } else if (role === "teacher") {
            const teacherData = { user: newUser._id, ...userData }
            const newTeacher = new Teacher({
                ...teacherData,
                role: role
            })
            newRecord = await newTeacher.save()
        } else {
            throw new Error("Role Invalid")
        }

        return newRecord
        //   else{
        // throw new Error("Failed to upload to cloud") 

        // }


    } catch (err) {
        throw err;
    }
    // send registration configuration email to the user
}

const verifyOTP = async (receivedOTP) => {
 try{
    // find if the otp match any otp in the database
   const user = await User.findOne({otp: receivedOTP})
  
//    if it couldnt find any
if (!user){
    throw new Error("Invalid OTP");
}
// first check if there is no otpexpiry in d database and check if the otpexpiry in the database is less than the new date
if (!user.otpExpiry || new Date(user.otpExpiry) <= new Date()){
    throw new Error("OTP has expired") 

    // clear otp and otpExpiry from the database if its expired
    await User.updateOne({ _id:user._id}, { $unset: {otp : "", otpExpiry: ""}})

    return {message : "OTP verfied successfully"}
}
   
}catch(err){
    throw  err
 }
}
module.exports = {
    PostregisterUser
}