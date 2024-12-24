import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import createUser from "../services/user.service.js";
import User from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

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

export default registerUser;
