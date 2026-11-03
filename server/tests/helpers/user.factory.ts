import { prisma } from "../../src/lib/prisma.js";

export async function createTestUser() {
    const testUser = await prisma.user.create({ data: {} });
    return testUser;
}
