import type { Request, Response } from "express";
import { signupSchema } from "../schemas/auth.schema.js";
import { signup as signupService } from "../services/auth.service.js";

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = signupSchema.parse(req.body);
        const result = await signupService(email, password);
        res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
    }
};
