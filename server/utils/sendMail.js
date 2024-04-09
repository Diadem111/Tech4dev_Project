const nodemailer = require('nodemailer');
// Create a transporter object using SMTP transport

// Function to send OTP via email
async function sendOTPByEmail(email, verifyOtp,expireOtp) {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Or your email service provider
    auth: {
      user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASSWORD    }
  });

  // Generate OTP
  // const otp = generateOTP();

  // Setup email data
  const mailOptions = {
    from: 'dolwithneybright1@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${verifyOtp}, kindly use because OTP will expire in ${expireOtp}`
  };

  // Send mail with defined transport object
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return verifyOtp; // Return the OTP for verification
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send OTP email');
  }
}

module.exports = { sendOTPByEmail };
// const mailjet = require('node-mailjet').connect(
//     process.env.MJ_APIKEY_PUBLIC,
//     process.env.MJ_APIKEY_PRIVATE
//   );
  
//   const sendOTP = async (email, verifyOtp,expireOtp  ) => {
//     const request = mailjet.post('send', { version: 'v3.1' }).request({
//       Messages: [
//         {
//           From: {
//             Email: 'bowaleadetunji@gmail.com',
//             Name: 'SCHOOLBASE team'
//           },
//           To: [
//             {
//               Email: email,
//               Name: 'Recipient Name'
//             }
//           ],
//           Subject: 'Your OTP for registration',
//           TextPart: `Your OTP is: ${verifyOtp}, kindly note that the OTP will expire in ${expireOtp }`
//         }
//       ]
//     });
  
//     try {
//       await request;
//       console.log('Email sent successfully');
//     } catch (err) {
//       console.error('Error sending email:', err.statusCode, err.message);
//       throw new Error('Failed to send email');
//     }
//   };
  
//   module.exports = { sendOTP };