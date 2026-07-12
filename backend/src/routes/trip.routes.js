import express from "express";

import TripController from "../controllers/trip.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import { validateTrip } from "../validators/trip.validator.js";

const router = express.Router();

/*
====================================
Create Trip
====================================
*/

router.post(

    "/",

    authMiddleware,

    validateTrip,

    TripController.createTrip

);

/*
====================================
Get All Trips
====================================
*/

router.get(

    "/",

    authMiddleware,

    TripController.getAllTrips

);

/*
====================================
Get Trip By ID
====================================
*/

router.get(

    "/:id",

    authMiddleware,

    TripController.getTripById

);

/*
====================================
Dispatch Trip
====================================
*/

router.patch(

    "/:id/dispatch",

    authMiddleware,

    TripController.dispatchTrip

);

/*
====================================
Complete Trip
====================================
*/

router.patch(

    "/:id/complete",

    authMiddleware,

    TripController.completeTrip

);

/*
====================================
Cancel Trip
====================================
*/

router.patch(

    "/:id/cancel",

    authMiddleware,

    TripController.cancelTrip

);

export default router;