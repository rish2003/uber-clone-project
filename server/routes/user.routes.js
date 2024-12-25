import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { registerUser, loginUser, getUserProfile, logoutUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

export const userRoutes = router.post("/register", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
    registerUser
)

export const loginRoute = router.post("/login", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
    loginUser
)

export const getUserProfileRoute = router.get("/profile", authUser, getUserProfile);
export const logoutUserRoute = router.get("/logout", authUser, logoutUser);
