import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import autoLoad from '@fastify/autoload';
import Fastify from 'fastify';
import { minimatch } from 'minimatch';
import type { Environment } from './common/schemas/env-schema.js';
import { getLogLevel } from './common/utils/get-log-level.js';
import envPlugin from './plugins/env.js';

type BuildOptions = {
  customEnvs?: Partial<Environment>;
};

export async function buildFastify(options?: BuildOptions) {
  const { customEnvs } = options ?? {};
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const fastify = Fastify({
    logger: true
  });

  // registering all routes in 'routes' folder with prefix "/api"
  await fastify.register(autoLoad, {
    dir: join(__dirname, 'modules'),
    dirNameRoutePrefix: false,
    matchFilter: path => minimatch(path, '**/routes/*.ts'),
    options: {
      prefix: '/api'
    }
  });

  // registering env plugin first
  await fastify.register(envPlugin, { customEnvs: customEnvs });

  // once we have the environment variables in fastify app, setting the log level
  fastify.log.level = getLogLevel(fastify.env.NODE_ENV);

  // registering all plugins in 'plugins' folder, except "env" which is registered before
  await fastify.register(autoLoad, {
    dir: join(__dirname, 'plugins'),
    ignorePattern: /env.ts/
  });

  fastify.get('/ping', (_, reply) => {
    reply.send({ ping: 'pong' });
  });

  return fastify;
}
