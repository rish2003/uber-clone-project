import mongoose from "mongoose";

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true, // Recommended for newer versions of Mongoose
    })
        .then(() => console.log('Connected to DB'))
        .catch(err => console.log(err));
}

export default connectToDb;
