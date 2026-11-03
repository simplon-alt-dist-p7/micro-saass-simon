import {
    createBrewSession,
    findActiveBrewSessionByUserId,
} from "../repositories/brew-session.repository.js";

export async function addBrewSession(recipeId: string, userId: string) {
    const activeSession = await findActiveBrewSessionByUserId(userId);
    if (!activeSession) return await createBrewSession(recipeId, userId);
}
