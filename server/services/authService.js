const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const { User, Teacher, Student,Application } = require('../models')
const path = require("path")
const Cloudinary = require("../middleware/cloudinary")
const multer = require("multer")
const { sendOTPByEmail } = require("../utils/sendMail")


// const PostregisterUser = async (requestFile, requestUser) => {
//     const { role, ...userData } = requestUser

//     let imgLink;

//     try {
//         // check if the email/user exist


//     } catch (err) {
//         throw new Error(err.message);
//         console.log(err.message)
//     }

// }

const verifyOTP = async (receivedOTP) => {
    try {
        // find if the otp match any otp in the database
        const user = await User.findOne({ otp: receivedOTP })

        //    if it couldnt find any
        if (!user) {
            throw new Error("Invalid OTP");
        }
        // first check if there is no otpexpiry in d database and check if the otpexpiry in the database is less than the new date
        if (!user.otpExpiry || new Date(user.otpExpiry) <= new Date()) {
            throw new Error("OTP has expired")

            // clear otp and otpExpiry from the database if its expired
            await User.updateOne({ _id: user._id }, { $unset: { otp: "", otpExpiry: "" } })

            return { message: "OTP verfied successfully" }
        }

    } catch (err) {
        throw err
    }
}
//  login user
const LoginUser = async (userInfo) => {
    try {
        const { email, password } = userInfo;
        const data = await User.findOne({ email });

        if (!data) {
            throw new Error("Student not Found");
        }

        const same = await new Promise((resolve, reject) => {
            data.validatePassword(password, (err, same) => {
                if (err) {
                    reject(new Error("Error occurred"));
                } else {
                    resolve(same);
                }
            });
        });

        if (!same) {
            throw new Error("Invalid Credentials!");
        }

        const token = jwt.sign({ email }, process.env.JWT_SEC, { expiresIn: "1h" });
        return token;
    } catch (err) {
        throw new Error(err.message);
    }
};



// dashboard authorization
const getDashboard = async (req) => {
    try {
        const token = req.headers.authorization;
        // console.log(token);

        // Verify if token is legitimate
        const decodedToken = await jwt.verify(token, process.env.JWT_SEC);

        // Extract email from the decoded token
        const email = decodedToken.email;
        const user = await User.findOne({ email });


        // Fetch related data from other collections
        const teacher = await Teacher.findOne({ user: user._id });
        const student = await Student.findOne({ user: user._id });
        const application = await Application.findOne({ user: user._id });

        return {
            user,
            teacher,
            student,
            application
        };
 } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        } else if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token');
        } else {
            throw new Error(error);
        }
    }
};

// Function to generate a random 5-digit number

const generateRandomNumber = () => {
    return Math.floor(10000 + Math.random() * 90000);
};


// forgot password - send password reset link to student's email
const forgetPassword = async (info) => {
    try {
        const { email } = info;

        // check if student with the provided email exists
        const student = await User.findOne({ email })
        if (!student) {
            throw new Error("Student not found")
        }

        // Generate 5-digit reset token
        const codeReset = generateRandomNumber();
        console.log(codeReset)

        // expiration for the token
        const codeExpire = new Date();
        codeExpire.setTime(codeExpire.getTime() + (10 * 60 * 1000)) //set to 10 mins

        // send the four digit code to the database
        await User.findOneAndUpdate({ email }, { codeReset, codeExpire })
        // Send password reset email to the student
        // send OTP by sendMail\
        const subject = `Password Reset Request`
        const htmlContent = `<h3>Dear ${email},</h3>
    <p>Your password reset code : ${codeReset}</p>
    <p>This OTP is valid for 10 minutes.</p>
    <p>If you did not request this, please ignore this email.</p>
    <p>Best Regards,</p>
    <p>SCHOOLBASE team</p>`

        await sendOTPByEmail(email, subject, htmlContent)

    } catch (err) {
        throw new Error(err.message)
    }
}



// reset passowrd by token and verify by jwt
const resetPassword = async (requestInfo) => {
    try {
        const { codeReset, newPassword, confirmPassword } = requestInfo;
        console.log(codeReset)

        // Verify if passwords match
        if (newPassword !== confirmPassword) {
            throw new Error("Passwords do not match")

        }

        // Verify if pin is provided
        if (!codeReset) {
            throw new Error("Pin is required")
        }

        const existingCode = await User.findOne({ codeReset });

        if (!existingCode) {
            throw new Error("Invalid code")
        }
        // 2. check if the code is valid or expired 
        if (existingCode.codeReset !== codeReset || existingCode.codeExpire < new Date()) {
            throw new Error("Sorry, the code is expired")
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password in the database
        await User.findOneAndUpdate({ codeReset }, { newPassword: hashedPassword, codeReset: null, codeExpire: null })


    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    // PostregisterUser,
    verifyOTP,
    LoginUser,
    forgetPassword,
    resetPassword,
    getDashboard,

}