import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const index = express();
import userRoutes from "./routes/user.routes.js";

import connectToDb from "./db/db.js";
connectToDb();

index.use(cors());
index.use(express.json());
index.use(express.urlencoded({ extended: true }));

index.get("/", (req, res) => {
    res.send("Hello World!");
})

index.use("/users", userRoutes);

export default index
