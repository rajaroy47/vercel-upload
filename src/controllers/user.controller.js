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