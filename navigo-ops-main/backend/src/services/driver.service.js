import DriverRepository from "../repositories/driver.repository.js";

class DriverService {

    // ======================================
    // Create Driver
    // ======================================

    async createDriver(driverData) {

        // Check duplicate license number
        const existingDriver =
            await DriverRepository.findByLicenseNumber(
                driverData.licenseNumber
            );

        if (existingDriver) {

            throw new Error(
                "License Number already exists."
            );

        }

        // Check expiry date

        const expiry = new Date(driverData.expiryDate);

        const today = new Date();

        if (expiry < today) {

            throw new Error(
                "Driver license has already expired."
            );

        }

      driverData.expiryDate = new Date(driverData.expiryDate);

return await DriverRepository.create(driverData);

    }

    // ======================================
    // Get All Drivers
    // ======================================

    async getAllDrivers(query) {

        return await DriverRepository.findAll(query);

    }

    // ======================================
    // Get Driver By ID
    // ======================================

    async getDriverById(id) {

        const driver =
            await DriverRepository.findById(Number(id));

        if (!driver) {

            throw new Error("Driver not found.");

        }

        return driver;

    }

    // ======================================
    // Update Driver
    // ======================================

    async updateDriver(id, driverData) {

        const driver =
            await DriverRepository.findById(Number(id));

        if (!driver) {

            throw new Error("Driver not found.");

        }

        // Check duplicate license number

        if (
            driver.licenseNumber !==
            driverData.licenseNumber
        ) {

            const duplicate =
                await DriverRepository.findByLicenseNumber(
                    driverData.licenseNumber
                );

            if (duplicate) {

                throw new Error(
                    "License Number already exists."
                );

            }

        }

        // Check expiry date

        const expiry =
            new Date(driverData.expiryDate);

        if (expiry < new Date()) {

            throw new Error(
                "Driver license has expired."
            );

        }
driverData.expiryDate = new Date(driverData.expiryDate);
        return await DriverRepository.update(

            Number(id),

            driverData

        );

    }

    // ======================================
    // Suspend Driver
    // ======================================

    async deleteDriver(id) {

        const driver =
            await DriverRepository.findById(Number(id));

        if (!driver) {

            throw new Error("Driver not found.");

        }

        if (driver.status === "ON_TRIP") {

            throw new Error(
                "Driver is currently on a trip and cannot be suspended."
            );

        }

        return await DriverRepository.softDelete(
            Number(id)
        );

    }

    // ======================================
    // Update Driver Status
    // ======================================

    async updateDriverStatus(id, status) {

        const driver =
            await DriverRepository.findById(Number(id));

        if (!driver) {

            throw new Error("Driver not found.");

        }

        return await DriverRepository.updateStatus(

            Number(id),

            status

        );

    }

    // ======================================
    // Check Driver Availability
    // (Used by Trip Module)
    // ======================================

    async checkDriverAvailability(driverId) {

        const driver =
            await DriverRepository.findById(driverId);

        if (!driver) {

            throw new Error("Driver not found.");

        }

        if (driver.status === "SUSPENDED") {

            throw new Error(
                "Suspended drivers cannot be assigned."
            );

        }

        if (driver.status === "ON_TRIP") {

            throw new Error(
                "Driver is already assigned to another trip."
            );

        }

        if (driver.isDeleted) {

            throw new Error(
                "Driver is inactive."
            );

        }

        const today = new Date();

        if (new Date(driver.expiryDate) < today) {

            throw new Error(
                "Driver license has expired."
            );

        }

        return true;

    }

}

export default new DriverService();