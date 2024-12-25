import { validationResult } from "express-validator";
import createUser from "../services/user.service.js";
import User from "../models/user.model.js";
import BlacklistToken from "../models/blacklistToken.model.js";

export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ error: "User already exist" });
        }

        if (!fullname || !fullname.firstname || !fullname.lastname) {
            return res.status(400).json({ error: "Fullname must include firstname and lastname" });
        }

        const hashedPassword = await User.hashPassword(password, 10);

        const user = await createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        });

        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Incorrect password" });
        }

        const token = user.generateAuthToken();

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie("token");

        // Safely extract token from Authorization header or cookies
        const authHeader = req.headers.authorization;
        const cookieToken = req.cookies?.token;

        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : cookieToken;

        if (!token) {
            return res.status(400).json({ error: "No token provided" });
        }

        // Add token to blacklist
        await BlacklistToken.create({ token });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
