import { z } from "zod";

const driverSchema = z.object({

    fullName: z
        .string()
        .trim()
        .min(3, "Driver Name is required"),

    licenseNumber: z
        .string()
        .trim()
        .min(5, "License Number is required"),

    licenseCategory: z
        .string()
        .trim()
        .min(1, "License Category is required"),

    expiryDate: z
        .string()
        .refine(
            (date) => !isNaN(Date.parse(date)),
            {
                message: "Invalid Expiry Date"
            }
        ),

    phone: z
        .string()
        .regex(
            /^[6-9]\d{9}$/,
            "Invalid Phone Number"
        ),

    safetyScore: z
        .number({
            invalid_type_error:
                "Safety Score must be a number"
        })
        .min(0, "Minimum Safety Score is 0")
        .max(100, "Maximum Safety Score is 100"),

    status: z.enum([
        "AVAILABLE",
        "ON_TRIP",
        "OFF_DUTY",
        "SUSPENDED"
    ])

});

export const validateDriver = (req, res, next) => {

    try {

        req.body.safetyScore = Number(
            req.body.safetyScore
        );

        driverSchema.parse(req.body);

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