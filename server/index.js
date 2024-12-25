import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const index = express();
import { userRegisterRoute, loginRoute, getUserProfileRoute, logoutUserRoute } from "./routes/user.routes.js"
import { CaptainRegisterRoute, CaptainLoginRoute, CaptainProfileRoute, CaptainLogoutRoute } from "./routes/captain.routes.js"
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

//user routes 
index.use("/users", userRegisterRoute);
index.use("/users", loginRoute);
index.use("/users", getUserProfileRoute);
index.use("/users", logoutUserRoute);

//captain routes
index.use("/captains", CaptainRegisterRoute);
index.use("/captains", CaptainLoginRoute);
index.use("/captains", CaptainProfileRoute);
index.use("/captains", CaptainLogoutRoute);

export default index;
