const Application = require('../models/application')
const User = require('../models/user')
const path = require("path")
const Cloudinary = require("../middleware/cloudinary")
const multer = require("multer")
const { sendOTPByEmail } = require("../utils/sendMail")


const createStudentService = async (applicationData, requestFiles) => {
  try {
      const { role, extracurricular, interests, previousSchools, skills, registeredCourses, ...newApplicantInfo } = applicationData;

      if (!role) {
          throw new Error("Role not specified");
      }

      const extracurricularArray = JSON.parse(extracurricular);
      const interestsArray = JSON.parse(interests);
      const previousSchoolsArray = JSON.parse(previousSchools);
      const skillsArray = JSON.parse(skills);
      const registeredCoursesArray = JSON.parse(registeredCourses);

      const data = requestFiles.passport[0].path;

      const studentExists = await User.findOne({ email: applicationData.email });

      if (studentExists) {
          throw new Error("An existing application is already pending for this student");
      }

      const verifyOtp = Math.floor(3000 + Math.random() * 5000).toString();
      const expireOtp = new Date();
      expireOtp.setTime(expireOtp.getTime() + (30 * 60 * 1000));

      const newUser = new User({
          ...newApplicantInfo,
          otp: verifyOtp,
          otpExpiry: expireOtp,
          passport: data,
      });

      const savedUser = await newUser.save();

      let newStudentInfo;

      if (role === "newApplicant") {
          const newStudentData = { user: savedUser._id, ...newApplicantInfo };
          const newStudent = {
              ...newStudentData,
              role: role,
              extracurricular: { list: extracurricularArray },
              interests: { list: interestsArray },
              skills: { list: skillsArray },
              registeredCourses: {list:registeredCoursesArray},
              previousSchools: { list: previousSchoolsArray },
          };

          newStudentInfo = new Application(newStudent);

          if (requestFiles.recommedationLetter) {
              newStudentInfo.recommedationLetter = { list: requestFiles.recommedationLetter.map(file => file.path) };
          }

          if (requestFiles.signature) {
              newStudentInfo.signature = { list: requestFiles.signature.map(file => file.path) };
          }

          if (requestFiles.additionalDocuments) {
              newStudentInfo.additionalDocuments = { list: requestFiles.additionalDocuments.map(file => file.path) };
          }

          await newStudentInfo.save();

          // Send OTP only if data is saved successfully
          await sendOTPByEmail(newApplicantInfo.email, verifyOtp, expireOtp);
      }

      return newStudentInfo;
  } catch (error) {
      throw new Error(error.message);
  }
};
module.exports = {
  createStudentService
}