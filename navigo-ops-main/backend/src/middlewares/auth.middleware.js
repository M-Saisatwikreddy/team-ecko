import jwt from "jsonwebtoken";

import { errorResponse } from "../utils/response.js";

const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            return errorResponse(
                res,
                "Authorization header missing",
                401
            );

        }

        const token = authHeader.startsWith("Bearer ")

            ? authHeader.split(" ")[1]

            : null;

        if (!token) {

            return errorResponse(
                res,
                "Token missing",
                401
            );

        }

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        req.user = decoded;

        next();

    } catch (error) {

        return errorResponse(
            res,
            "Invalid or Expired Token",
            401
        );

    }

};

export default authMiddleware;