// template.js

// Function to generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Function that returns the email layout containing the OTP
function getOTPEmailTemplate(otp) {
  return {
    subject: 'Your Verification Code',
    text: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #2b6cb0; text-align: center;">Authentication Request</h2>
        <p>Hello,</p>
        <p>Use the following One-Time Password (OTP) to complete your verification process. Do not share this code with anyone.</p>
        
        <div style="background-color: #f7fafc; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #2d3748;">${otp}</span>
        </div>
        
        <p style="font-size: 12px; color: #718096; text-align: center;">This code expires in 5 minutes.</p>
      </div>
    `,
  };
}

module.exports = { generateOTP, getOTPEmailTemplate };