import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const index = express();
import { userRoutes, loginRoute, getUserProfileRoute, logoutUserRoute } from "./routes/user.routes.js"
import cookieParser from "cookie-parser";

import connectToDb from "./db/db.js";
connectToDb();

index.use(cors());
index.use(express.json());
index.use(express.urlencoded({ extended: true }));
index.use(cookieParser());

index.get("/", (req, res) => {
    res.send("Hello World!");
})

index.use("/users", userRoutes);
index.use("/users", loginRoute);
index.use("/users", getUserProfileRoute);
index.use("/users", logoutUserRoute);

export default index
