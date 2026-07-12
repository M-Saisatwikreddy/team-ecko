import TripService from "../services/trip.service.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";

class TripController {

    /*
    ============================
    Create Trip
    ============================
    */

    async createTrip(req, res) {

        try {

            const trip = await TripService.createTrip(req.body);

            return successResponse(

                res,

                "Trip created successfully.",

                trip,

                201

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

    /*
    ============================
    Get All Trips
    ============================
    */

    async getAllTrips(req, res) {

        try {

            const trips = await TripService.getAllTrips(req.query);

            return successResponse(

                res,

                "Trips fetched successfully.",

                trips

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                500

            );

        }

    }

    /*
    ============================
    Get Trip By ID
    ============================
    */

    async getTripById(req, res) {

        try {

            const trip = await TripService.getTripById(

                req.params.id

            );

            return successResponse(

                res,

                "Trip fetched successfully.",

                trip

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                404

            );

        }

    }

    /*
    ============================
    Dispatch Trip
    ============================
    */

    async dispatchTrip(req, res) {

        try {

            const trip = await TripService.dispatchTrip(

                req.params.id

            );

            return successResponse(

                res,

                "Trip dispatched successfully.",

                trip

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

    /*
    ============================
    Complete Trip
    ============================
    */

    async completeTrip(req, res) {

        try {

            const trip = await TripService.completeTrip(

                req.params.id,

                req.body

            );

            return successResponse(

                res,

                "Trip completed successfully.",

                trip

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

    /*
    ============================
    Cancel Trip
    ============================
    */

    async cancelTrip(req, res) {

        try {

            const trip = await TripService.cancelTrip(

                req.params.id

            );

            return successResponse(

                res,

                "Trip cancelled successfully.",

                trip

            );

        }

        catch (error) {

            return errorResponse(

                res,

                error.message,

                400

            );

        }

    }

}

export default new TripController();