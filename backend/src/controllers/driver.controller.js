import DriverService from "../services/driver.service.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";

class DriverController {

    // ===============================
    // Create Driver
    // ===============================

    async createDriver(req, res) {

        try {

            const driver = await DriverService.createDriver(req.body);

            return successResponse(
                res,
                "Driver created successfully.",
                driver,
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

    // ===============================
    // Get All Drivers
    // ===============================

    async getAllDrivers(req, res) {

        try {

            const drivers = await DriverService.getAllDrivers(req.query);

            return successResponse(
                res,
                "Drivers fetched successfully.",
                drivers
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                500
            );

        }

    }

    // ===============================
    // Get Driver By ID
    // ===============================

    async getDriverById(req, res) {

        try {

            const driver = await DriverService.getDriverById(req.params.id);

            return successResponse(
                res,
                "Driver fetched successfully.",
                driver
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                404
            );

        }

    }

    // ===============================
    // Update Driver
    // ===============================

    async updateDriver(req, res) {

        try {

            const driver = await DriverService.updateDriver(
                req.params.id,
                req.body
            );

            return successResponse(
                res,
                "Driver updated successfully.",
                driver
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                400
            );

        }

    }

    // ===============================
    // Suspend Driver
    // ===============================

    async deleteDriver(req, res) {

        try {

            const driver = await DriverService.deleteDriver(
                req.params.id
            );

            return successResponse(
                res,
                "Driver suspended successfully.",
                driver
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                400
            );

        }

    }

    // ===============================
    // Update Driver Status
    // ===============================

    async updateDriverStatus(req, res) {

        try {

            const { status } = req.body;

            const driver = await DriverService.updateDriverStatus(
                req.params.id,
                status
            );

            return successResponse(
                res,
                "Driver status updated successfully.",
                driver
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

export default new DriverController();