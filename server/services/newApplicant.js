const Student = require('../models/student')
const User = require('../models/user')
const path = require("path")
const Cloudinary = require("../middleware/cloudinary")
const multer = require("multer")


const createStudentService = async (requestFiles, applicationData) => {

  try {
    const { role, ...newApplicantInfo } = applicationData
    // Here, you could add logic to validate applicationData, check for duplicates, etc.
    const studentExists = await User.findOne({ email: applicationData.email })
    // This could be a middleware too...
    if (studentExists) {
      throw new Error('An existing application is already pending for this student')
    }

    // Assuming applicationData is valid and the student doesn't already exist, save the new student.
    const newUser = new User({
      ...newApplicantInfo,
      otp: null,   // initialize opt and otpexpiry as null
      otpExpiry: null

    });

    // save file to the appropiate fields in the User model
    if (requestFiles) {
      newUser.file = requestFiles.find(file => file.fieldname === "passport")?.path || null;
    }

    await newUser.save()
    return newUser


    // save signature, additonalletter etc into the database 
    if (role === "newApplicant") {
      const newStudentData = { user: newUser._id, ...newApplicantInfo }
      const newStudent = new Student({
        ...newStudentData,
        role: role,
        recommendationLetter: requestFiles.find(file => file.fieldname === "recommendation")?.path || null,
        signature: requestFiles.find(file => file.fieldname === "signature")?.path || null,
        additionalDocuments: requestFiles.find(file => file.fieldname === "additionalDocuments")?.path || null

      })
      await newStudent.save()
      return newStudent

    }

  } catch (error) {
    throw new Error("Application not saved.")
  }
}

module.exports = {
  createStudentService
}