const Application = require('../models/application')
const User = require('../models/user')
const path = require("path")
const Cloudinary = require("../middleware/cloudinary")
const multer = require("multer")
const { sendOTPByEmail } = require("../utils/sendMail")


const createStudentService = async (applicationData, requestFiles) => {

  try {
    const { role, ...newApplicantInfo } = applicationData
    const data = requestFiles.passport[0].path
    // Here, you could add logic to validate applicationData, check for duplicates, etc.
    const studentExists = await User.findOne({ email: applicationData.email })
    // This could be a middleware too...
    if (studentExists) {
      throw new Error('An existing application is already pending for this student')
    }

    

                         //    generation of verification otp
                         const verifyOtp = Math.floor(3000 + Math.random() * 5000).toString() // Generate a 4-digit OTP
                         const expireOtp = new Date();
                         expireOtp.setTime(expireOtp.getTime() + (30 * 60 * 1000));  //set expire time to 30 minutsees
     

    //   // Assuming applicationData is valid and the student doesn't already exist, save the new student.
    const newUser = new User({
      ...newApplicantInfo,
      otp: verifyOtp,   // initialize opt and otpexpiry as null
      otpExpiry:expireOtp,
      passport: data

    });
  
    await newUser.save()
    //  return newUser

// send OTP
    await sendOTPByEmail(newApplicantInfo.email, verifyOtp, expireOtp)

    //   // save signature, additonalletter etc into the database 
    if (role === "newApplicant") {
      const newStudentData = { user: newUser._id, ...newApplicantInfo }
      const newStudent = {
        ...newStudentData,
        role: role,
        extracurricular: { list: newApplicantInfo.extracurricular },
        interests: { list: newApplicantInfo.interests },
        skills: { list: newApplicantInfo.skills },
        previousSchools: { list: newApplicantInfo.previousSchools },
      }
      const newStudentInfo = new Application(newStudent);


      //     // handle mutliple files for passport etc
      if (requestFiles.recommedationLetter) {
        newStudentInfo.recommedationLetter = { list: requestFiles.recommedationLetter.map(file => file.path) };
      }

      if (requestFiles.signature) {
        newStudentInfo.signature = { list: requestFiles.signature.map(file => file.path) };

      }
      if (requestFiles.additionalDocuments) {
        newStudentInfo.additionalDocuments = { list: requestFiles.additionalDocuments.map(file => file.path) };

      }

      await newStudentInfo.save()
      return newStudentInfo

    }

  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  createStudentService
}