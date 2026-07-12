import VehicleService from "../services/vehicle.service.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";

class VehicleController {

    // ==============================
    // Create Vehicle
    // ==============================

    async createVehicle(req, res) {

        try {

            const vehicle = await VehicleService.createVehicle(req.body);

            return successResponse(
                res,
                "Vehicle created successfully.",
                vehicle,
                201
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                400
            );

        }

    }

    // ==============================
    // Get All Vehicles
    // ==============================

    async getAllVehicles(req, res) {

        try {

            const vehicles = await VehicleService.getAllVehicles(req.query);

            return successResponse(
                res,
                "Vehicles fetched successfully.",
                vehicles
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                500
            );

        }

    }

    // ==============================
    // Get Vehicle By ID
    // ==============================

    async getVehicleById(req, res) {

        try {

            const vehicle = await VehicleService.getVehicleById(
                req.params.id
            );

            return successResponse(
                res,
                "Vehicle fetched successfully.",
                vehicle
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                404
            );

        }

    }

    // ==============================
    // Update Vehicle
    // ==============================

    async updateVehicle(req, res) {

        try {

            const vehicle = await VehicleService.updateVehicle(

                req.params.id,

                req.body

            );

            return successResponse(
                res,
                "Vehicle updated successfully.",
                vehicle
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                400
            );

        }

    }

    // ==============================
    // Soft Delete Vehicle
    // ==============================

    async deleteVehicle(req, res) {

        try {

            const vehicle = await VehicleService.deleteVehicle(
                req.params.id
            );

            return successResponse(
                res,
                "Vehicle retired successfully.",
                vehicle
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                400
            );

        }

    }

    // ==============================
    // Update Status
    // ==============================

    async updateVehicleStatus(req, res) {

        try {

            const { status } = req.body;

            const vehicle =
                await VehicleService.updateVehicleStatus(

                    req.params.id,

                    status

                );

            return successResponse(
                res,
                "Vehicle status updated successfully.",
                vehicle
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                400
            );

        }

    }

}

export default new VehicleController();
