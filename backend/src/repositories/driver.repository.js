import prisma from "../config/db.js";

class DriverRepository {

    // ===============================
    // Create Driver
    // ===============================

    async create(data) {

        return await prisma.driver.create({
            data
        });

    }

    // ===============================
    // Get All Drivers
    // ===============================

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
                        fullName: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },

                    {
                        licenseNumber: {
                            contains: search,
                            mode: "insensitive"
                        }
                    },

                    {
                        phone: {
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

        const drivers = await prisma.driver.findMany({

            where,

            skip,

            take: Number(limit),

            orderBy: {

                [sortBy]: order

            }

        });

        const total = await prisma.driver.count({

            where

        });

        return {

            total,

            page: Number(page),

            limit: Number(limit),

            totalPages: Math.ceil(total / limit),

            drivers

        };

    }

    // ===============================
    // Find Driver By ID
    // ===============================

    async findById(id) {

        return await prisma.driver.findFirst({

            where: {

                id,

                isDeleted: false

            }

        });

    }

    // ===============================
    // Find By License Number
    // ===============================

    async findByLicenseNumber(licenseNumber) {

        return await prisma.driver.findUnique({

            where: {

                licenseNumber

            }

        });

    }

    // ===============================
    // Update Driver
    // ===============================

    async update(id, data) {

        return await prisma.driver.update({

            where: {

                id

            },

            data

        });

    }

    // ===============================
    // Suspend Driver (Soft Delete)
    // ===============================

    async softDelete(id) {

        return await prisma.driver.update({

            where: {

                id

            },

            data: {

                status: "SUSPENDED",

                isDeleted: true,

                deletedAt: new Date()

            }

        });

    }

    // ===============================
    // Update Driver Status
    // ===============================

    async updateStatus(id, status) {

        return await prisma.driver.update({

            where: {

                id

            },

            data: {

                status

            }

        });

    }

}

export default new DriverRepository();