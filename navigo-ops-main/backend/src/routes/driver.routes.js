import express from "express";

import DriverController from "../controllers/driver.controller.js";

import { validateDriver } from "../validators/driver.validator.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/*
===================================
Create Driver
===================================
*/

router.post(
    "/",
    authMiddleware,
    validateDriver,
    DriverController.createDriver
);

/*
===================================
Get All Drivers
===================================
*/

router.get(
    "/",
    authMiddleware,
    DriverController.getAllDrivers
);

/*
===================================
Get Driver By ID
===================================
*/

router.get(
    "/:id",
    authMiddleware,
    DriverController.getDriverById
);

/*
===================================
Update Driver
===================================
*/

router.put(
    "/:id",
    authMiddleware,
    validateDriver,
    DriverController.updateDriver
);

/*
===================================
Update Driver Status
===================================
*/

router.patch(
    "/:id/status",
    authMiddleware,
    DriverController.updateDriverStatus
);

/*
===================================
Suspend Driver
===================================
*/

router.delete(
    "/:id",
    authMiddleware,
    DriverController.deleteDriver
);

export default router;