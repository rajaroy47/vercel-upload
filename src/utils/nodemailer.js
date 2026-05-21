import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT, 
  // FIX: Port 465 must be true, port 587 must be false
  secure: Number(process.env.EMAIL_PORT) === 465, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

if (process.env.NODE_ENV !== "production") {
  transporter.verify((error, success) => {
    if (error) {
      console.error("Nodemailer transporter error:", error);
    } else {
      console.log("Nodemailer is configured and ready to send emails");
    }
  });
}

const sendEmail = async (options) => {
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_USER}>`, 
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

// Exporting both tools safely
export {
    transporter, 
    sendEmail
};