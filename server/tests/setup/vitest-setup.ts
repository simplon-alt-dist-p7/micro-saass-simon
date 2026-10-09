import { afterEach } from 'vitest';
import { prisma } from '../../src/lib/prisma.js';
import { loadTestEnv } from './test-env.js';

loadTestEnv();

afterEach(async () => {
    await prisma.brewSession.deleteMany();
    await prisma.recipe.deleteMany();
    await prisma.user.deleteMany();
});
