import fastifyEnv from '@fastify/env';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { FastifyPluginName } from '../common/enums/fastify-plugin-name.js';
import { EnvSchema, type Environment } from '../common/schemas/env-schema.js';
import type { FastifyBuildOptions } from '../common/types/fastify-build-options.js';

declare module 'fastify' {
  interface FastifyInstance {
    [FastifyPluginName.Env]: Environment;
  }
}

export default fp<FastifyBuildOptions>(
  async (fastify: FastifyInstance, options) => {
    fastify.register(fastifyEnv, {
      dotenv: false,
      schema: EnvSchema,
      data: Object.assign(process.env, options.customEnvs),
      confKey: FastifyPluginName.Env
    });
  },
  {
    name: FastifyPluginName.Env
  }
);
