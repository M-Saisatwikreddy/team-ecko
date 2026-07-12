import { z } from "zod";

const vehicleSchema = z.object({

    registrationNo: z
        .string()
        .trim()
        .min(3, "Registration Number is required"),

    vehicleName: z
        .string()
        .trim()
        .min(2, "Vehicle Name is required"),

    vehicleType: z
        .string()
        .trim()
        .min(2, "Vehicle Type is required"),

    maxLoadCapacity: z
        .number({
            invalid_type_error: "Maximum Load Capacity must be a number"
        })
        .positive("Capacity must be greater than 0"),

    odometer: z
        .number({
            invalid_type_error: "Odometer must be a number"
        })
        .min(0, "Odometer cannot be negative"),

    acquisitionCost: z
        .number({
            invalid_type_error: "Acquisition Cost must be a number"
        })
        .positive("Acquisition Cost must be greater than 0"),

    status: z.enum([
        "AVAILABLE",
        "ON_TRIP",
        "IN_SHOP",
        "RETIRED"
    ])
});

export const validateVehicle = (req, res, next) => {

    try {

        req.body.maxLoadCapacity = Number(req.body.maxLoadCapacity);
        req.body.odometer = Number(req.body.odometer);
        req.body.acquisitionCost = Number(req.body.acquisitionCost);

        vehicleSchema.parse(req.body);

        next();

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: "Validation Failed",

            errors: error.errors

        });

    }

};