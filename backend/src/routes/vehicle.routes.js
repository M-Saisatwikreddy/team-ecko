import express from "express";

import VehicleController from "../controllers/vehicle.controller.js";

import { validateVehicle } from "../validators/vehicle.validator.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/*
=====================================
Create Vehicle
POST /api/vehicles
=====================================
*/

router.post(
    "/",
    authMiddleware,
    validateVehicle,
    VehicleController.createVehicle
);

/*
=====================================
Get All Vehicles
GET /api/vehicles
=====================================
*/

router.get(
    "/",
    authMiddleware,
    VehicleController.getAllVehicles
);

/*
=====================================
Get Vehicle By ID
GET /api/vehicles/:id
=====================================
*/

router.get(
    "/:id",
    authMiddleware,
    VehicleController.getVehicleById
);

/*
=====================================
Update Vehicle
PUT /api/vehicles/:id
=====================================
*/

router.put(
    "/:id",
    authMiddleware,
    validateVehicle,
    VehicleController.updateVehicle
);

/*
=====================================
Update Vehicle Status
PATCH /api/vehicles/:id/status
=====================================
*/

router.patch(
    "/:id/status",
    authMiddleware,
    VehicleController.updateVehicleStatus
);

/*
=====================================
Retire Vehicle
DELETE /api/vehicles/:id
=====================================
*/

router.delete(
    "/:id",
    authMiddleware,
    VehicleController.deleteVehicle
);

export default router;