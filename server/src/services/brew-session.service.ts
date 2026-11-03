import { createBrewSession } from "../repositories/brew-session.repository.js";

export async function addBrewSession(recipeId: string, userId: string) {
    return await createBrewSession(recipeId, userId);
}
