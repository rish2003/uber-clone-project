import Captain from "../models/captain.model.js";

const createCaptain = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType }) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error("Please provide all the required fields");
    }

    const captain = await Captain.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
        }
    });

    return captain;
};

export default createCaptain;