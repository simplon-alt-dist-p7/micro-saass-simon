import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export async function createUser(user: Prisma.UserCreateInput) {
    return await prisma.user.create({
        data: user,
    });
}
