import { defineConfig } from '@playwright/test';
import globalSetup from './test/e2e/configs/global-setup';

export default defineConfig({
  testDir: './test/e2e', // Directory where your tests will be located
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: 'http://172.28.0.5:5173', // URL of your running application
    headless: true
  },
  globalSetup: './test/e2e/configs/global-setup.ts'
});
