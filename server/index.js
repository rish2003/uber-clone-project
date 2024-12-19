import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const index = express();

index.use(cors());

index.get("/", (req, res) => {
    res.send("Hello World!");
})

export default index
