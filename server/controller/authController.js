const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userServices } = require("../services");
const { sendMail } = require("../utils/sendMail");
const { User, Teacher, Student, Application } = require("../models");
const Cloudinary = require("../middleware/cloudinary");
const { sendOTPByEmail } = require("../utils/sendMail");

const home = (req, res) => {
  res.status(200).json({
    status: "ok",
    server: " welcome to the home page",
  });
};

//   register a new user
const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    // destructure the data
    const { role, classTaught, ...userData } = req.body;

    // make imgLink and uploadTocloud a variable
    let imgLink;
    let uploadToCloud;

    if (!role) {
      res.status(400).send({ message: "Role not specified", status: false });
    }

    // const classTaughtArray = JSON.parse(classTaught);
    // const subjectsTaughtArray = JSON.parse(subjectsTaught);

    // ckeck if user exist
    const userExist = await User.findOne({
      email: userData.email,
    });

    if (userExist) {
      res.status(400).send({ message: "Email Exists!", status: false });
    }

    if (req.file) {
      uploadToCloud = await Cloudinary.uploader.upload(req.file.path);
      imgLink = uploadToCloud.url;

      // create instance of user and save
      const newUser = await new User({
        ...userData,
        passport: imgLink,
        // Set other user properties
      });

      let userSaved = await newUser.save();

      // if user is saved then go to the next function
      if (userSaved) {
        const verifyOtp = Math.floor(3000 + Math.random() * 5000).toString();
        const expireOtp = new Date();
        expireOtp.setTime(expireOtp.getTime() + 30 * 60 * 1000);

        // html for the otp
        const subject = "Welcome to SchoolBase!";
        const htmlContent = `<h3>Dear ${userData.firstName},</h3>
            <p>Welcome to SchoolBase! You have successfully registered as a ${role}.</p>
            <p>Your OTP is : ${verifyOtp}, will expire in ${expireOtp}</p>
            <p>Best Regards,</p>
            <p>SCHOOLBASE team</p>`;

        let newRecord;
        if (role === "student") {
          // Your student registration code here
          const studentData = { user: newUser._id, ...userData };
          const newStudent = new Student({
            ...studentData,
            role: role,
          });
        }
        if (role === "teacher") {
          const teacherData = { user: newUser._id, ...userData };
          const newTeacher = new Teacher({
            ...teacherData,
            role: role,
            classTaught: { list: classTaught },
            // subjectsTaught: { list: subjectsTaughtArray },
          });
          newRecord = await newTeacher.save();
          await sendOTPByEmail(userData.email, subject, htmlContent);
        } else {
          res.status(400).send({ message: "Invalid Role" });
        }
        console.log(newRecord);
        let  frontendInfo = newRecord

        res.status(200).send({  status:true, message: "success",frontendInfo });
      }
    }
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
};

const userVerifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;

    const result = await userServices.verifyOTP(otp);

    res
      .status(200)
      .json({ message: "OTP veirfied succesfully, welcome!", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login a student
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userServices.LoginUser({ email, password });
    console.log(result);
    res.status(200).json({ message: "Login successful", result, status: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//   forgot password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await userServices.forgetPassword({ email });
    res.status(200).json({ message: "password sent to your email" });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    // console.log(req.body)
    const data = await userServices.resetPassword(req.body);
    res.status(200).json({ message: "password reset successful" });
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
};

// get dashboard based on authorization from headers
const getdashBoard = async (req, res) => {
  try {
    console.log(req.user);
    let dd = req.user;
    const result = await userServices.getDashboard(dd);
    res.status(200).json({ message: "welcome User", result, status: true });
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
};
const allUserTable = async (req, res) => {
  try {
    // Delete the TeacherTable collection
    const result = await User.find({});
    res.status(200).json({ message: "TeacherTable successfully", result });
  } catch (error) {
    console.error("Error deleting TeacherTable:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting TeacherTable" });
  }
};

const allTeacher = async (req, res) => {
  try {
    // Delete the TeacherTable collection
    const result = await Teacher.find({});
    res.status(200).json({ message: "TeacherTable  successfully", result });
  } catch (error) {
    console.error("Error deleting TeacherTable:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting TeacherTable" });
  }
};

const allStudent = async (req, res) => {
  try {
    // Delete the TeacherTable collection
    const result = await Student.find({});
    res.status(200).json({ message: "TeacherTable successfully", result });
  } catch (error) {
    console.error("Error deleting TeacherTable:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting TeacherTable" });
  }
};

const allApplicationStudent = async (req, res) => {
  try {
    // Delete the TeacherTable collection
    const result = await Application.find();
    res.status(200).json({ message: "TeacherTable  successfully", result });
  } catch (error) {
    console.error("Error deleting TeacherTable:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting TeacherTable" });
  }
};

module.exports = {
  home,
  registerUser,
  userVerifyOtp,
  loginUser,
  forgotPassword,
  resetPassword,
  getdashBoard,
  allUserTable,
  allStudent,
  allTeacher,
  allApplicationStudent,
};
