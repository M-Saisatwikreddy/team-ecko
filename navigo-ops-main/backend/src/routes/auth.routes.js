import express from "express";

import AuthController from "../controllers/auth.controller.js";

import { validateLogin } from "../validators/auth.validator.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

/*
    POST
    /api/auth/login
*/

router.post(
    "/login",
    validateLogin,
    AuthController.login
);

/*
    GET
    /api/auth/profile
*/

router.get(
    "/profile",
    authMiddleware,
    AuthController.profile
);

export default router;