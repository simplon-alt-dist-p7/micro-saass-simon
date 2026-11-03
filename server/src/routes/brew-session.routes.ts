import { Router } from "express";
import { createBrewSession } from "../controllers/brew-session.controller.js";
import { fakeAuth } from "../middlewares/fakeAuth.js";

export const brewSessionRouter = Router();

brewSessionRouter.post("/brew-sessions", fakeAuth, createBrewSession);
