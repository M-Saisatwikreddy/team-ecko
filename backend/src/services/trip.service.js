import TripRepository from "../repositories/trip.repository.js";
import VehicleRepository from "../repositories/vehicle.repository.js";
import DriverRepository from "../repositories/driver.repository.js";

class TripService {

    /*
    ============================================
    Create Trip (Draft)
    ============================================
    */

    async createTrip(tripData) {

        // Check Vehicle

        const vehicle = await VehicleRepository.findById(
            Number(tripData.vehicleId)
        );

        if (!vehicle) {

            throw new Error("Vehicle not found.");

        }

        // Check Driver

        const driver = await DriverRepository.findById(
            Number(tripData.driverId)
        );

        if (!driver) {

            throw new Error("Driver not found.");

        }

        // Vehicle Status

        if (vehicle.status !== "AVAILABLE") {

            throw new Error(
                "Selected vehicle is not available."
            );

        }

        // Driver Status

        if (driver.status !== "AVAILABLE") {

            throw new Error(
                "Selected driver is not available."
            );

        }

        // License Expiry

        if (new Date(driver.expiryDate) < new Date()) {

            throw new Error(
                "Driver license has expired."
            );

        }

        // Cargo Validation

        if (
            tripData.cargoWeight >
            vehicle.maxLoadCapacity
        ) {

            throw new Error(
                "Cargo exceeds vehicle capacity."
            );

        }

        // Create Draft Trip

        return await TripRepository.create({

            ...tripData,

            status: "DRAFT"

        });

    }

    /*
    ============================================
    Get All Trips
    ============================================
    */

    async getAllTrips(query) {

        return await TripRepository.findAll(query);

    }

    /*
    ============================================
    Get Trip
    ============================================
    */

    async getTripById(id) {

        const trip =
            await TripRepository.findById(Number(id));

        if (!trip) {

            throw new Error("Trip not found.");

        }

        return trip;

    }

    /*
    ============================================
    Dispatch Trip
    ============================================
    */

    async dispatchTrip(id) {

        const trip =
            await TripRepository.findById(Number(id));

        if (!trip) {

            throw new Error("Trip not found.");

        }

        if (trip.status !== "DRAFT") {

            throw new Error(
                "Only Draft trips can be dispatched."
            );

        }

        // Update Vehicle

        await VehicleRepository.updateStatus(

            trip.vehicleId,

            "ON_TRIP"

        );

        // Update Driver

        await DriverRepository.updateStatus(

            trip.driverId,

            "ON_TRIP"

        );

        // Update Trip

        return await TripRepository.update(

            trip.id,

            {

                status: "DISPATCHED",

                startDate: new Date()

            }

        );

    }

    /*
    ============================================
    Complete Trip
    ============================================
    */

    async completeTrip(id, data) {

        const trip =
            await TripRepository.findById(Number(id));

        if (!trip) {

            throw new Error("Trip not found.");

        }

        if (trip.status !== "DISPATCHED") {

            throw new Error(
                "Trip is not dispatched."
            );

        }

        // Vehicle Available

        await VehicleRepository.update(

            trip.vehicleId,

            {

                odometer: data.finalOdometer,

                status: "AVAILABLE"

            }

        );

        // Driver Available

        await DriverRepository.updateStatus(

            trip.driverId,

            "AVAILABLE"

        );

        // Update Trip

        return await TripRepository.update(

            trip.id,

            {

                status: "COMPLETED",

                endDate: new Date(),

                finalOdometer: data.finalOdometer,

                fuelConsumed: data.fuelConsumed,

                actualDistance: data.actualDistance

            }

        );

    }

    /*
    ============================================
    Cancel Trip
    ============================================
    */

    async cancelTrip(id) {

        const trip =
            await TripRepository.findById(Number(id));

        if (!trip) {

            throw new Error("Trip not found.");

        }

        if (trip.status !== "DISPATCHED") {

            throw new Error(
                "Only dispatched trips can be cancelled."
            );

        }

        // Vehicle

        await VehicleRepository.updateStatus(

            trip.vehicleId,

            "AVAILABLE"

        );

        // Driver

        await DriverRepository.updateStatus(

            trip.driverId,

            "AVAILABLE"

        );

        return await TripRepository.update(

            trip.id,

            {

                status: "CANCELLED"

            }

        );

    }

}

export default new TripService();