import Captain from "../models/captain.model.js";
import createCaptain from "../services/captain.service.js";
import { validationResult } from "express-validator";
import BlacklistToken from "../models/blacklistToken.model.js";


export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await Captain.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ error: "Captain already exist" });
    }

    const hashedPassword = await Captain.hashPassword(password, 10);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });

}

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await Captain.findOne({ email }).select("+password");
    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await captain.comparePassword(password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Incorrect password" });
    }

    const token = captain.generateAuthToken();

    // Set token in cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ captain, token });
};

export const getCaptainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain });
}

export const logoutCaptain = async (req, res) => {
    const token = req.cookies?.token || req.headers?.authorization.split(" ")[1];
    await BlacklistToken.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};