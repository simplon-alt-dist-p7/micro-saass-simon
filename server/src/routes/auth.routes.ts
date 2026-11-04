import { Router } from "express";
import { signup } from "../controllers/auth.controller.js";

export const authRouter = Router();
authRouter.post("/auth/signup", signup);
