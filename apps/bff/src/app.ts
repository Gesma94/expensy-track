import 'dotenv/config';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import autoLoad from '@fastify/autoload';
import Fastify from 'fastify';
import { minimatch } from 'minimatch';
import type { FastifyBuildOptions } from './common/types/fastify-build-options.js';
import { getFastifyLogger } from './common/utils/get-fastify-logger.js';

export async function buildFastify(options?: FastifyBuildOptions) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const fastify = Fastify({
    logger: getFastifyLogger(process.env.NODE_ENV)
  });

  // registering all plugins in 'plugins' folder
  await fastify.register(autoLoad, {
    options,
    dir: join(__dirname, 'plugins')
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
  fastify.get('/ping', (_, reply) => {
    reply.send({ ping: 'pong' });
  });

  return fastify;
}
