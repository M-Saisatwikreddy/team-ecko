import VehicleRepository from "../repositories/vehicle.repository.js";

class VehicleService {

    // ==============================
    // Create Vehicle
    // ==============================

    async createVehicle(vehicleData) {

        // Check duplicate registration number
        const existingVehicle =
            await VehicleRepository.findByRegistration(
                vehicleData.registrationNo
            );

        if (existingVehicle) {
            throw new Error(
                "Vehicle Registration Number already exists."
            );
        }

        return await VehicleRepository.create(vehicleData);

    }

    // ==============================
    // Get All Vehicles
    // ==============================

    async getAllVehicles(query) {

        return await VehicleRepository.findAll(query);

    }

    // ==============================
    // Get Vehicle By ID
    // ==============================

    async getVehicleById(id) {

        const vehicle =
            await VehicleRepository.findById(Number(id));

        if (!vehicle) {

            throw new Error("Vehicle not found.");

        }

        return vehicle;

    }

    // ==============================
    // Update Vehicle
    // ==============================

    async updateVehicle(id, vehicleData) {

        const vehicle =
            await VehicleRepository.findById(Number(id));

        if (!vehicle) {

            throw new Error("Vehicle not found.");

        }

        // Prevent duplicate registration number

        if (
            vehicle.registrationNo !==
            vehicleData.registrationNo
        ) {

            const duplicate =
                await VehicleRepository.findByRegistration(
                    vehicleData.registrationNo
                );

            if (duplicate) {

                throw new Error(
                    "Vehicle Registration Number already exists."
                );

            }

        }

        return await VehicleRepository.update(

            Number(id),

            vehicleData

        );

    }

    // ==============================
    // Soft Delete Vehicle
    // ==============================

    async deleteVehicle(id) {

        const vehicle =
            await VehicleRepository.findById(Number(id));

        if (!vehicle) {

            throw new Error("Vehicle not found.");

        }

        if (vehicle.status === "ON_TRIP") {

            throw new Error(
                "Vehicle is currently on trip and cannot be retired."
            );

        }

        return await VehicleRepository.softDelete(Number(id));

    }

    // ==============================
    // Update Status
    // ==============================

    async updateVehicleStatus(id, status) {

        const vehicle =
            await VehicleRepository.findById(Number(id));

        if (!vehicle) {

            throw new Error("Vehicle not found.");

        }

        return await VehicleRepository.updateStatus(

            Number(id),

            status

        );

    }

}

export default new VehicleService();