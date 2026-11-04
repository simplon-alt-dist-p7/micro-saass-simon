import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../src/app.js";
import { createTestUser } from "../helpers/user.factory.js";

describe("POST /api/v1/auth/signup", () => {
    const userEmail = "brewer@mail.com";
    it("creates a user", async () => {
        const response = await request(app)
            .post("/api/v1/auth/signup")
            .send({ email: userEmail, password: "brewing42" });

        expect(response.status).toBe(201);
        expect(response.body.accessToken).not.toBeUndefined();
        expect(response.body.refreshToken).not.toBeUndefined();
        expect(response.body.user.email).toEqual(userEmail);
    });

    it("tries to create a user with an already used email", async () => {
        const testUser = await createTestUser();
        const response = await request(app)
            .post("/api/v1/auth/signup")
            .send({ email: testUser.email, password: "test-password" });

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("email is already used");
    });

    it("tries to create a user with an invalid password", async () => {
        const response = await request(app)
            .post("/api/v1/auth/signup")
            .send({ email: "badpass@mail.com", password: "notgood" });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("password is too short");
    });
});
