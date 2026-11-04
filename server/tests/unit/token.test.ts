import { describe, expect, it } from "vitest";
import {
    generateRefreshToken,
    hashRefreshToken,
    signAccessToken,
    verifyAccessToken,
} from "../../src/lib/token.js";

describe("token", () => {
    it("round-trips the user id through sign and verify", async () => {
        const token = await signAccessToken("user-1");
        const userId = await verifyAccessToken(token);

        expect(userId).toBe("user-1");
    });

    it("rejects a tampered token", async () => {
        const token = await signAccessToken("user-1");

        await expect(verifyAccessToken(`${token}tampered`)).rejects.toThrow();
    });

    it("generates refresh tokens that hash deterministically but differ from each other", () => {
        const first = generateRefreshToken();
        const second = generateRefreshToken();

        expect(first).not.toBe(second);
        expect(hashRefreshToken(first)).toBe(hashRefreshToken(first));
        expect(hashRefreshToken(first)).not.toBe(hashRefreshToken(second));
    });
});
