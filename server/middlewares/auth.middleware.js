import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklistToken.model.js";
import Captain from "../models/captain.model.js";

export const authUser = async (req, res, next) => {
    try {
        // Check if the Authorization header or token cookie is provided
        const authHeader = req.headers.authorization;
        const cookieToken = req.cookies?.token;

        // Extract token from Authorization header or cookie
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : cookieToken;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Check if the token is blacklisted
        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify token and attach user info to the request
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

export const authCaptain = async (req, res, next) => {
    try {
        // Check if the Authorization header or token cookie is provided
        const authHeader = req.headers.authorization;
        const cookieToken = req.cookies?.token;

        // Extract token from Authorization header or cookie
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : cookieToken;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Check if the token is blacklisted
        const isBlacklisted = await BlacklistToken.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify token and attach captain info to the request
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await Captain.findById(decoded.id);
        if (!captain) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.captain = captain;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};
