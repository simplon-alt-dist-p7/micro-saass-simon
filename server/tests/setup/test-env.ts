import { resolve } from 'node:path';
import { config } from 'dotenv';

export function loadTestEnv(): void {
  config({ path: resolve(process.cwd(), '.env.test') });
}
