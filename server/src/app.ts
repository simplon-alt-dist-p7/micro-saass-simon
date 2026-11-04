import express from "express";
import { authRouter } from "./routes/auth.routes.js";
import { brewSessionRouter } from "./routes/brew-session.routes.js";
import { healthRouter } from "./routes/health.routes.js";

export const app = express();

app.use(express.json());
app.use("/api/v1", healthRouter);
app.use("/api/v1", brewSessionRouter);
app.use("/api/v1", authRouter);
