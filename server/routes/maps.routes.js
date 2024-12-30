import express from "express";
import { query } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import {
    getCoordinates,
    getDistanceTime,
    getAutoCompleteSuggestions
} from "../controllers/map.controller.js";

const router = express.Router();

export const GetCoordinatesRoute = router.get("/get-coordinates", [
    query('address').isString().isLength({ min: 3 }),
    authUser,
], getCoordinates);

export const GetDistanceTimeRoute = router.get("/get-distance-time", [
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser,
], getDistanceTime);

export const GetSuggestionsRoute = router.get("/get-suggestions", [
    query('input').isString().isLength({ min: 3 }),
    authUser,
], getAutoCompleteSuggestions);
