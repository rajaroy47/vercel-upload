import { User } from "../models/user.model.js";
// FIX: Imported sendEmail alongside transporter
import { transporter, sendEmail } from "../utils/nodemailer.js"; 

const createUser = async (req, res) => {
    try {
        const { fullName, email } = req.body;

        if (!fullName || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const user = await User.create({
            fullName,
            email,
        });

        // FIX: Moved email trigger block ABOVE the JSON response so it actually runs
        try {
            await sendEmail({
                to: email, // Send directly to the newly registered user
                subject: "Welcome to our MERN Test Platform",
                text: `Hello ${fullName}, your account has been successfully created.`,
                html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #4f46e5;">Welcome Aboard, ${fullName}!</h2>
                    <p>Hey there,</p>
                    <p>Your user profile has been successfully built on our standalone MERN test stack hosted on Vercel.</p>
                    <blockquote style="background: #f3f4f6; padding: 10px 15px; border-left: 4px solid #4f46e5;">
                        <strong>Registered Email:</strong> ${email}
                    </blockquote>
                    <p style="font-size: 0.85rem; color: #666;">Generated automatically from Vercel Serverless Engine.</p>
                </div>
                `
            });
        } catch (emailError) {
            // Log error but don't crash the request execution
            console.error("Email delivery skipped/failed:", emailError.message);
        }

        // FIX: Now we safely return our JSON response after the mail loop finishes
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            data: users,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    createUser,
    getUsers
};