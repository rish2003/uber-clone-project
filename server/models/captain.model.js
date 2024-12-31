import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    },
    password: {
        type: String,
        required: true,
        select: false
    },

    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },

    vehicle: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
            minlength: [6, 'Plate number must be at least 6 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'],
        },

        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "moto", "auto"],
        },
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        },
    }

})

captainSchema.methods.generateAuthToken = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" })
    return token;

};

captainSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
};

const Captain = mongoose.model("Captain", captainSchema);
export default Captain;
