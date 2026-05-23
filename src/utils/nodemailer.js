import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),

  // 465 => true
  // 587 => false
  secure: Number(process.env.EMAIL_PORT) === 465,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter
if (process.env.NODE_ENV !== "production") {
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ Nodemailer Error:", error);
    } else {
      console.log("✅ Email Server Ready");
    }
  });
}

const sendEmail = async ({
  to,
  subject,
  text,
  html,
}) => {
  try {
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email Sent:", info.messageId);

    return info;
  } catch (error) {
    console.log("❌ Email Send Error:", error);

    throw new Error("Failed to send email");
  }
};

export {
  transporter,
  sendEmail
};