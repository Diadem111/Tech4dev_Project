const Application = require("../models/application");
const User = require("../models/user");
const path = require("path");
const Cloudinary = require("../middleware/cloudinary");
const multer = require("multer");
const { sendOTPByEmail } = require("../utils/sendMail");

const createStudentService = async (applicationData, requestFiles) => {
  try {
    const {
      role,
      extracurricular,
      interests,
      previousSchools,
      skills,
      ...newApplicantInfo
    } = applicationData;

    //  check if role is sent
    if (!role) {
      throw new Error("Role not specified");
    } else {
      // check if email exist
      const studentExists = await User.findOne({
        email: newApplicantInfo.email,
      });
      if (studentExists) {
        throw new Error(
          "An existing application is already pending for this student"
        );
      } else {
        const data = requestFiles.passport[0].path;
        // console.log(data)
        // logic for otp
        const verifyOtp = Math.floor(3000 + Math.random() * 5000).toString();
        const expireOtp = new Date();
        expireOtp.setTime(expireOtp.getTime() + 30 * 60 * 1000);

        // html for the otp
        const subject = "Welcome to SchoolBase!";
        const htmlContent = `<h3>Dear ${newApplicantInfo.firstName},</h3>
        <p>Welcome to SchoolBase! You have successfully registered as a ${role}.</p>
        <p>Your OTP is : ${verifyOtp}, will expire in ${expireOtp}</p>
        <p>Best Regards,</p>
        <p>SCHOOLBASE team</p>`;

        // create instacnee of user
        const newUser = new User({
          ...newApplicantInfo,
          otp: verifyOtp,
          otpExpiry: expireOtp,
          passport: data,
        });

        const savedUser = await newUser.save();
        // console.log(savedUser)

        let newStudentInfo;

        if (role === "newApplicant") {
          const newStudentData = { user: savedUser._id, ...newApplicantInfo };
          const newStudent = {
            ...newStudentData,
            role: role,
            extracurricular: { list: extracurricular },
            interests: { list: interests },
            skills: { list: skills },
          };

          newStudentInfo = new Application(newStudent);

          if (requestFiles.recommedationLetter) {
            newStudentInfo.recommedationLetter = {
              list: requestFiles.recommedationLetter.map((file) => file.path),
            };
          }

          if (requestFiles.signature) {
            newStudentInfo.signature = {
              list: requestFiles.signature.map((file) => file.path),
            };
          }

          if (requestFiles.additionalDocuments) {
            newStudentInfo.additionalDocuments = {
              list: requestFiles.additionalDocuments.map((file) => file.path),
            };
          }

          let sentIInfo = await newStudentInfo.save();

          // Send OTP only if data is saved successfully
          await sendOTPByEmail(newApplicantInfo.email, subject, htmlContent);
        }
        console.log(newStudentInfo);
        return newStudentInfo;
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  createStudentService,
};
