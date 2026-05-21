import { User } from "../models/user.model.js";

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

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });

        try {
            const info = await transporter.sendMail({
                from: '"Example Team" hloiamrajaroy@gmail.com', // sender address
                to: "fortestingpurpose698@gmail.com", // list of recipients
                subject: "Hello", // subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // HTML body
            });

            console.log("Message sent: %s", info.messageId);
            // Preview URL is only available when using an Ethereal test account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (err) {
            console.error("Error while sending mail:", err);
        }

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