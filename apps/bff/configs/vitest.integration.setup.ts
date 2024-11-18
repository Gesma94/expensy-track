/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    hookTimeout: 30000,
    setupFiles: './vitest.integration.setup.ts',
    server: {
      deps: {
        inline: ['@fastify/autoload']
      }
    }
  }
});
