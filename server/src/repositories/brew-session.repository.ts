import { prisma } from "../lib/prisma.js";

export async function createBrewSession(recipeId: string, userId: string) {
    const currentUserId = userId;
    return await prisma.brewSession.create({
        data: { recipeId, currentUserId },
    });
}

export async function findActiveBrewSessionByUserId(userId: string) {
    return await prisma.brewSession.findFirst({
        where: { currentUserId: userId, endedAt: null },
    });
}
