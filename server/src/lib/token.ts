import { createHash, randomBytes } from "node:crypto";
import { jwtVerify, SignJWT } from "jose";

const ACCESS_TOKEN_TTL = "15m";
export const REFRESH_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function getJwtSecret(): Uint8Array {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not set");
    }
    return new TextEncoder().encode(secret);
}

export async function signAccessToken(userId: string): Promise<string> {
    return new SignJWT({ sub: userId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(ACCESS_TOKEN_TTL)
        .sign(getJwtSecret());
}

export async function verifyAccessToken(token: string): Promise<string> {
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (typeof payload.sub !== "string") {
        throw new Error("access token has no subject");
    }
    return payload.sub;
}

export function generateRefreshToken(): string {
    return randomBytes(32).toString("hex");
}

export function hashRefreshToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
}
