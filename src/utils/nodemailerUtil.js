import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,         // smtp.gmail.com
  port: Number(process.env.EMAIL_PORT), // 587
  secure: false,                        // false = STARTTLS on port 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,       // Gmail App Password (16 chars, no spaces)
  },
  tls: {
    // FIX: Allows Gmail's certificate chain which may include a self-signed
    // intermediate cert depending on your Node.js / OS trust store version.
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("❌ VERIFY ERROR:", error);
  } else {
    console.log("✅ SMTP READY");
  }
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email Sent:", info.messageId);
    return info;

  } catch (error) {
    console.log("❌ SEND ERROR:", error);
    throw error;
  }
};

export { transporter, sendEmail };