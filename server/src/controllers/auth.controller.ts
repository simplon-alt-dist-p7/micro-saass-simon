import { Prisma } from "@prisma/client";
import type { Request, Response } from "express";
import * as z from "zod";
import { signupSchema } from "../schemas/auth.schema.js";
import { signup as signupService } from "../services/auth.service.js";

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = signupSchema.parse(req.body);
        const result = await signupService(email, password);

        res.status(201).json(result);
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            return res.status(409).json({ message: "email is already used" });
        } else if (error instanceof z.ZodError) {
            return res.status(400).json({ message: error.issues[0].message });
        }
        return res.status(400).json({ message: (error as Error).message });
    }
};
