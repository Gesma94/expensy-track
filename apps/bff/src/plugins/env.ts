import fastifyEnv from '@fastify/env';
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
  (fastify, options, done) => {
    fastify.register(fastifyEnv, {
      dotenv: false,
      schema: EnvSchema,
      confKey: FastifyPluginName.Env,
      data: Object.assign(process.env, options.customEnvs)
    });

    done();
  },
  {
    name: FastifyPluginName.Env
  }
);
