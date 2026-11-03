import type { Request, Response } from "express";
import { addBrewSession } from "../services/brew-session.service.js";

export const createBrewSession = async (req: Request, res: Response) => {
    const recipe = req.body.recipeId;
    if (!req.user) {
        return res.status(401).json({ message: "failed to resolve user" });
    }
    const user = req.user.id;

    const brewSession = await addBrewSession(recipe, user);
    res.status(201).json(brewSession);
};
