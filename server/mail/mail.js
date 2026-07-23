// email.js
const nodemailer = require("nodemailer");
const { generateOTP, getOTPEmailTemplate } = require("./template");

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

async function sendOTPEmail(recipientEmail) {
  const otp = generateOTP();
  const emailTemplate = getOTPEmailTemplate(otp);

  const mailOptions = {
    from: `"Alpha" <${process.env.EMAIL}>`,
    to: recipientEmail,
    subject: emailTemplate.subject,
    text: emailTemplate.text,
    html: emailTemplate.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP successfully sent to ${recipientEmail}`);
    return { success: true, otp };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendOTPEmail };
