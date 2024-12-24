import User from "../models/user.model.js";

const createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error("Please provide all the required fields");
    }

    const user = await User.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password,
    });
    return user;
};

export default createUser;
