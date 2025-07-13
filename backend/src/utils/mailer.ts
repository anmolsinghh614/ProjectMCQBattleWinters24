import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

export async function sendOtpEmail(email: string, otp: string, username: string) {
  try {
    await transporter.sendMail({
      from: `"MCQ Battle" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Verify Your MCQ Battle Account – OTP Inside!",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 25px; border-radius: 15px; background: linear-gradient(135deg, #ffafbd, #ffc3a0); color: #333; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);">
          <h1 style="text-align: center; font-size: 28px; color: #fff; text-shadow: 1px 1px 2px rgba(0,0,0,0.2);">✨ Welcome, ${username}! ✨</h1>
          <p style="font-size: 16px; text-align: center; margin-top: 20px;">We're thrilled to have you at <b>MCQ Battle</b>. Verify your email with the OTP below:</p>
          <div style="margin: 30px auto; width: fit-content; padding: 10px 30px; border-radius: 10px; background-color: rgba(255,255,255,0.7); backdrop-filter: blur(10px); box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <span style="font-size: 28px; letter-spacing: 5px; font-weight: bold; color: #e63946;">${otp}</span>
          </div>
          <p style="font-size: 14px; text-align: center; color: #ffffff; opacity: 0.9;">⏳ OTP expires in <strong>10 minutes</strong>. If you didn't request this, please disregard this message.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending OTP email:", error);
  }
}
