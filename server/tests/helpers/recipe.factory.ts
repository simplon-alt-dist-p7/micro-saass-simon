import type { Prisma } from "@prisma/client";
import { prisma } from "../../src/lib/prisma.js";

let count = 0;

export async function createTestRecipe(
    overrides?: Partial<Prisma.RecipeCreateInput>,
) {
    const testRecipe = await prisma.recipe.create({
        data: {
            name: `testRecipe ${count++}`,
            ...overrides,
        },
    });
    return testRecipe;
}
