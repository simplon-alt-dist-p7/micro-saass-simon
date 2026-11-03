import { prisma } from "../lib/prisma.js";

export async function createBrewSession(recipeId: string, userId: string) {
    const currentUserId = userId;
    return await prisma.brewSession.create({
        data: { recipeId, currentUserId },
    });
}
