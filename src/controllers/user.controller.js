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

        await sendEmail({
        to: email,

        subject: "Welcome to MERN TEST APP",

        text: `Hello ${fullName}, Welcome to MERN TEST APP`,

        html: `
            <div style="font-family: Arial; padding: 20px;">
            <h2>Welcome ${fullName}</h2>

            <p>
                Thank you for registering with
                <strong>MERN TEST APP</strong>
            </p>

            <p>
                Your account has been created successfully.
            </p>

            <br>

            <a 
                href="https://lavender-lark-113297.hostingersite.com/"
                style="
                background: #2563eb;
                color: white;
                padding: 12px 20px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
                "
            >
                Visit Website
            </a>
            </div>
        `,
        });
        

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