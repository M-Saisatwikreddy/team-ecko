import prisma from "../config/db.js";

class AuthRepository {

    // Find user by email
    async findUserByEmail(email) {

        return await prisma.user.findUnique({

            where: {
                email
            }

        });

    }

    // Find user by ID
    async findUserById(id) {

        return await prisma.user.findUnique({

            where: {
                id
            }

        });

    }

    // Create User (Future Register/Admin)
    async createUser(data) {

        return await prisma.user.create({

            data

        });

    }

    // Update User
    async updateUser(id, data) {

        return await prisma.user.update({

            where: {
                id
            },

            data

        });

    }

}

export default new AuthRepository();