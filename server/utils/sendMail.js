const nodemailer = require('nodemailer');
// Create a transporter object using SMTP transport

// Function to send OTP via email
async function sendOTPByEmail(email, userName, subject,htmlContent) {
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
    subject: subject,
    text: htmlContent,
  };

  // Send mail with defined transport object
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    // return verifyOtp; // Return the OTP for verification
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send OTP email');
  }
}

module.exports = { sendOTPByEmail };
