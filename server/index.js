import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const index = express();
import { userRegisterRoute, loginRoute, getUserProfileRoute, logoutUserRoute } from "./routes/user.routes.js"
import { CaptainRegisterRoute, CaptainLoginRoute, CaptainProfileRoute, CaptainLogoutRoute } from "./routes/captain.routes.js"
import { RideRoute, getFareRoute, RideConfirmRoute, RideStartRoute, RideEndRoute } from "./routes/ride.routes.js"
import { GetCoordinatesRoute, GetDistanceTimeRoute, GetSuggestionsRoute } from "./routes/maps.routes.js"
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

//ride routes
index.use("/rides", RideRoute);
index.use("/rides", getFareRoute);
index.use("/rides", RideConfirmRoute);
index.use("/rides", RideStartRoute);
index.use("/rides", RideEndRoute);

//map routes
index.use("/maps", GetCoordinatesRoute);
index.use("/maps", GetDistanceTimeRoute);
index.use("/maps", GetSuggestionsRoute);


export default index;
