import { prisma } from "../../src/lib/prisma.js";

export async function createTestBrewSession(userId: string, recipeId: string) {
    const testBrewSession = await prisma.brewSession.create({
        data: {
            currentUserId: userId,
            recipeId,
        },
    });
    return testBrewSession;
}
