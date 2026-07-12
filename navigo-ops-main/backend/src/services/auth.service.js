import AuthRepository from "../repositories/auth.repository.js";

import { comparePassword } from "../utils/password.js";

import { generateToken } from "../config/jwt.js";

class AuthService {

    async login(email, password) {

        // Find User
        const user = await AuthRepository.findUserByEmail(email);

        if (!user) {

            throw new Error("Invalid Email or Password");

        }

        // Check Password
        const isPasswordValid = await comparePassword(

            password,

            user.password

        );

        if (!isPasswordValid) {

            throw new Error("Invalid Email or Password");

        }

        // Check Active User

        if (!user.isActive) {

            throw new Error("User Account Disabled");

        }

        // Generate JWT

        const token = generateToken(user);

        return {

            token,

            user: {

                id: user.id,

                fullName: user.fullName,

                email: user.email,

                role: user.role

            }

        };

    }

    async getProfile(userId) {

        const user = await AuthRepository.findUserById(userId);

        if (!user) {

            throw new Error("User Not Found");

        }

        return {

            id: user.id,

            fullName: user.fullName,

            email: user.email,

            role: user.role,

            isActive: user.isActive

        };

    }

}

export default new AuthService();