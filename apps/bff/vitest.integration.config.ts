/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    hookTimeout: 10000,
    coverage: {
      provider: 'v8'
    },
    setupFiles: './vitest.integration.setup.ts',
    include: ['./test/**/*.test.ts'],
    alias: {
      '#enums': new URL('./src/common/enums', import.meta.url).pathname,
      '#schemas': new URL('./src/common/schemas', import.meta.url).pathname,
      '#types': new URL('./src/common/types', import.meta.url).pathname,
      '#utils': new URL('./src/common/utils', import.meta.url).pathname,
      '#gql': new URL('./src/gql', import.meta.url).pathname
    },
    server: {
      deps: {
        inline: ['@fastify/autoload']
      }
    }
  }
});
