import tsconfigPaths from 'vite-tsconfig-paths';
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    hookTimeout: 10000,
    setupFiles: './configs/vitest.integration.setup.ts',
    include: ['./test/**/*.test.ts'],
    server: {
      deps: {
        inline: ['@fastify/autoload']
      }
    }
  }
});
