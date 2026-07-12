import { z } from "zod";

const tripSchema = z.object({

    source: z
        .string()
        .trim()
        .min(2, "Source is required"),

    destination: z
        .string()
        .trim()
        .min(2, "Destination is required"),

    vehicleId: z
        .number({
            invalid_type_error: "Vehicle ID must be a number"
        })
        .positive(),

    driverId: z
        .number({
            invalid_type_error: "Driver ID must be a number"
        })
        .positive(),

    cargoWeight: z
        .number({
            invalid_type_error: "Cargo Weight must be a number"
        })
        .positive(),

    plannedDistance: z
        .number({
            invalid_type_error: "Planned Distance must be a number"
        })
        .positive(),

    revenue: z
        .number()
        .nonnegative()
        .optional()

});

export const validateTrip = (req, res, next) => {

    try {

        req.body.vehicleId = Number(req.body.vehicleId);

        req.body.driverId = Number(req.body.driverId);

        req.body.cargoWeight = Number(req.body.cargoWeight);

        req.body.plannedDistance = Number(req.body.plannedDistance);

        if (req.body.revenue) {

            req.body.revenue = Number(req.body.revenue);

        }

        tripSchema.parse(req.body);

        next();

    }

    catch (error) {

        return res.status(400).json({

            success: false,

            message: "Validation Failed",

            errors: error.errors

        });

    }

};