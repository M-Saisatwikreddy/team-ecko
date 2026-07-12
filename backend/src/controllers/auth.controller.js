import AuthService from "../services/auth.service.js";
import {
    successResponse,
    errorResponse
} from "../utils/response.js";

class AuthController {

    async login(req, res) {

        try {

            const { email, password } = req.body;

            const data = await AuthService.login(
                email,
                password
            );

            return successResponse(
                res,
                "Login Successful",
                data
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                401
            );

        }

    }

    async profile(req, res) {

        try {

            const user = await AuthService.getProfile(
                req.user.id
            );

            return successResponse(
                res,
                "Profile Fetched Successfully",
                user
            );

        } catch (error) {

            return errorResponse(
                res,
                error.message,
                404
            );

        }

    }

}

export default new AuthController();