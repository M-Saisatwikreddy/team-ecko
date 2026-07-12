import prisma from "../config/db.js";

class VehicleRepository {

    // Create Vehicle
    async create(data) {

        return await prisma.vehicle.create({
            data
        });

    }

    // Get All Vehicles
    async findAll({

        search = "",

        status = "",

        page = 1,

        limit = 10,

        sortBy = "createdAt",

        order = "desc"

    }) {

        const skip = (page - 1) * limit;

        const where = {

            isDeleted: false,

            ...(search && {

                OR: [

                    {

                        registrationNo: {

                            contains: search,

                            mode: "insensitive"

                        }

                    },

                    {

                        vehicleName: {

                            contains: search,

                            mode: "insensitive"

                        }

                    },

                    {

                        vehicleType: {

                            contains: search,

                            mode: "insensitive"

                        }

                    }

                ]

            }),

            ...(status && {

                status

            })

        };

        const vehicles = await prisma.vehicle.findMany({

            where,

            skip,

            take: Number(limit),

            orderBy: {

                [sortBy]: order

            }

        });

        const total = await prisma.vehicle.count({

            where

        });

        return {

            total,

            page: Number(page),

            limit: Number(limit),

            totalPages: Math.ceil(total / limit),

            vehicles

        };

    }

    // Find By ID
    async findById(id) {

        return await prisma.vehicle.findFirst({

            where: {

                id,

                isDeleted: false

            }

        });

    }

    // Find By Registration
    async findByRegistration(registrationNo) {

        return await prisma.vehicle.findUnique({

            where: {

                registrationNo

            }

        });

    }

    // Update Vehicle
    async update(id, data) {

        return await prisma.vehicle.update({

            where: {

                id

            },

            data

        });

    }

    // Soft Delete Vehicle
    async softDelete(id) {

        return await prisma.vehicle.update({

            where: {

                id

            },

            data: {

                isDeleted: true,

                deletedAt: new Date(),

                status: "RETIRED"

            }

        });

    }

    // Change Status
    async updateStatus(id, status) {

        return await prisma.vehicle.update({

            where: {

                id

            },

            data: {

                status

            }

        });

    }

}

export default new VehicleRepository();