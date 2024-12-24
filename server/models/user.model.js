import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "Firstname must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, "Lastname must be at least 3 characters long"],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, "Email must be at least 3 characters long"],
        maxlength: [50, "Email must be less than 50 characters long"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, "Password must be at least 6 characters long"],
    },
    socketId: {
        type: String,
    },
});

userSchema.methods.generateAuthToken = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);

export default User;
