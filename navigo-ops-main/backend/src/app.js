import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Welcome to TransitOps API"

    });

});

/*
    Routes
*/

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

export default app;