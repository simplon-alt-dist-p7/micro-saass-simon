import { hash } from "argon2";
import {
    generateRefreshToken,
    hashRefreshToken,
    REFRESH_TOKEN_TTL_MS,
    signAccessToken,
} from "../lib/token.js";

import { createUser } from "../repositories/user.repository.js";

function createRefreshToken() {
    const refreshToken = generateRefreshToken();
    const refreshTokenHash = hashRefreshToken(refreshToken);
    const refreshTokenExpiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

    return { refreshToken, refreshTokenHash, refreshTokenExpiresAt };
}

export async function signup(email: string, password: string) {
    const passwordHash = await hash(password);
    const { refreshToken, refreshTokenHash, refreshTokenExpiresAt } =
        createRefreshToken();

    const user = await createUser({
        email,
        passwordHash,
        refreshTokenHash,
        refreshTokenExpiresAt,
    });

    const accessToken = await signAccessToken(user.id);

    return {
        accessToken,
        refreshToken,
        user: { id: user.id, email: user.email },
    };
}
