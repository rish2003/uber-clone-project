import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { registerCaptain, loginCaptain, logoutCaptain, getCaptainProfile } from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";

export const CaptainRegisterRoute = router.post("/register", [body('email').isEmail().withMessage('Invalid Email'),
body('fullname.firstname').isLength({ min: 3 }).withMessage('Firstname must be at least 3 characters long'),
body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
body('vehicle.plate').isLength({ min: 6 }).withMessage('Plate number must be at least 6 characters long'),
body('vehicle.capacity').isLength({ min: 1 }).withMessage('Capacity must be at least 1'),
body('vehicle.vehicleType').isLength({ min: 3 }).withMessage('Vehicle type must be at least 3 characters long'),
], registerCaptain);


export const CaptainLoginRoute = router.post("/login", [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], loginCaptain);

export const CaptainProfileRoute = router.get("/profile", authCaptain, getCaptainProfile);
export const CaptainLogoutRoute = router.get("/logout", authCaptain, logoutCaptain);
