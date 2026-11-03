import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../src/app.js";
import { createTestRecipe } from "../helpers/recipe.factory.js";
import { createTestUser } from "../helpers/user.factory.js";

describe("POST /api/v1/brew-sessions", () => {
    it("creates a brew session with automatic creation date", async () => {
        const testUser = await createTestUser();
        const testRecipe = await createTestRecipe();
        const response = await request(app)
            .post("/api/v1/brew-sessions")
            .set("x-test-user-id", testUser.id)
            .send({ recipeId: testRecipe.id });

        expect(response.status).toBe(201);
        expect(response.body.startedAt).not.toBeUndefined();
        expect(response.body.startedAt).not.toBeNull();
    });
});
