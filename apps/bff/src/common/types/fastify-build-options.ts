import type { Environment } from '#schemas/env-schema.js';

export type FastifyBuildOptions = {
  customEnvs?: Partial<Environment>;
};
