import type { Prisma } from "@prisma/client";
import { prisma } from "../../src/lib/prisma.js";

let count = 0;

export async function createTestUser(
    overrides?: Partial<Prisma.UserCreateInput>,
) {
    const testUser = await prisma.user.create({
        data: {
            email: `testuser${count++}@mail.com`,
            passwordHash: "not-a-real-hash",
            ...overrides,
        },
    });
    return testUser;
}
