import { execSync } from 'node:child_process';
import type { FullConfig } from '@playwright/test';
import waitOn from 'wait-on';

async function globalSetup(config: FullConfig) {
  try {
    execSync('pnpm --workspace-root docker:e2e:up', { stdio: 'inherit' });
    // Wait for the frontend to be ready
    await waitOn({
      resources: ['http://localhost:5173/'],
      timeout: 30000
    });

    console.log('Services are up and running');
  } catch (error) {
    console.error('Error during global setup:', error);
    // Ensure containers are torn down in case of setup failure
    throw error;
  }
}

export default globalSetup;
