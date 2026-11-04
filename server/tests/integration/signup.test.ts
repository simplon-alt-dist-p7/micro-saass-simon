import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../src/app.js";

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
});
