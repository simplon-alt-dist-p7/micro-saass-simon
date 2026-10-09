import { execSync } from 'node:child_process';
import { loadTestEnv } from './test-env.js';

export default function setup(): void {
  loadTestEnv();

  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
}
