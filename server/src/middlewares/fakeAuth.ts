import type { NextFunction, Request, Response } from "express";

export const fakeAuth = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.headers["x-test-user-id"];

    if (typeof userId !== "string") {
        res.status(401).json({
            message: "missing or invalid x-test-user-id header",
        });
        return;
    }
    req.user = { id: userId };

    next();
};
