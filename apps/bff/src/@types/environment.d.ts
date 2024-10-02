import type { Environment } from '../common/schemas/env-schema.ts';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
}
