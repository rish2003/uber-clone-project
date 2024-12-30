import { validationResult } from 'express-validator';
import { getFare, createRide, confirmRide, startRide, endRide } from '../services/ride.service.js';
import { getDistanceTime, getAddressCoordinate, getCaptainsInTheRadius } from '../services/maps.service.js';
import { sendMessageToSocketId } from '../socket.js';
import RideModel from '../models/ride.model.js';

export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

        ride.otp = "";

        const rideWithUser = await RideModel.findOne({ _id: ride._id }).populate('user');

        captainsInRadius.map((captain) => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser,
            });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

export const getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Similarly convert `confirmRide`, `startRide`, and `endRide` to ES6.
