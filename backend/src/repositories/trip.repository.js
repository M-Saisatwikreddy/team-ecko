import prisma from "../config/db.js";

class TripRepository {

    // ===========================================
    // Create Trip
    // ===========================================

    async create(data) {

        return await prisma.trip.create({

            data,

            include: {

                vehicle: true,

                driver: true

            }

        });

    }

    // ===========================================
    // Get All Trips
    // ===========================================

    async findAll({

        page = 1,

        limit = 10,

        search = "",

        status = "",

        sortBy = "createdAt",

        order = "desc"

    }) {

        const skip = (page - 1) * limit;

        const where = {

            ...(status && {

                status

            }),

            ...(search && {

                OR: [

                    {

                        source: {

                            contains: search,

                            mode: "insensitive"

                        }

                    },

                    {

                        destination: {

                            contains: search,

                            mode: "insensitive"

                        }

                    }

                ]

            })

        };

        const trips = await prisma.trip.findMany({

            where,

            skip,

            take: Number(limit),

            include: {

                vehicle: true,

                driver: true

            },

            orderBy: {

                [sortBy]: order

            }

        });

        const total = await prisma.trip.count({

            where

        });

        return {

            total,

            page: Number(page),

            limit: Number(limit),

            totalPages: Math.ceil(total / limit),

            trips

        };

    }

    // ===========================================
    // Find Trip By ID
    // ===========================================

    async findById(id) {

        return await prisma.trip.findUnique({

            where: {

                id

            },

            include: {

                vehicle: true,

                driver: true

            }

        });

    }

    // ===========================================
    // Update Trip
    // ===========================================

    async update(id, data) {

        return await prisma.trip.update({

            where: {

                id

            },

            data,

            include: {

                vehicle: true,

                driver: true

            }

        });

    }

    // ===========================================
    // Delete Trip
    // ===========================================

    async delete(id) {

        return await prisma.trip.delete({

            where: {

                id

            }

        });

    }

}

export default new TripRepository();