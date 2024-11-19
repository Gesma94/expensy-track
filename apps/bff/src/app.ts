import 'dotenv/config';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import autoLoad from '@fastify/autoload';
import Fastify from 'fastify';
import { minimatch } from 'minimatch';
import type { FastifyBuildOptions } from './common/types/fastify-build-options.js';
import { getFastifyLogger } from './common/utils/get-fastify-logger.js';
import authenticateRoute from './modules/auth/routes/authenticate.js';
import loginGoogleRoute from './modules/auth/routes/login-google.js';
import loginRoute from './modules/auth/routes/login.js';
import logoutRoute from './modules/auth/routes/logout.js';
import refreshTokenRoute from './modules/auth/routes/refresh-token.js';
import signUpRoute from './modules/auth/routes/sign-up.js';

export async function buildFastify(options?: FastifyBuildOptions) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const fastify = Fastify({
    pluginTimeout: 200000,
    logger: getFastifyLogger(process.env.NODE_ENV)
  });

  // registering all plugins in 'plugins' folder
  fastify.register(autoLoad, {
    options,
    dir: join(__dirname, 'plugins')
  });

  // registering all routes in 'routes' folder with prefix "/api"
  fastify.register(authenticateRoute, { prefix: '/api' });
  fastify.register(loginGoogleRoute, { prefix: '/api' });
  fastify.register(loginRoute, { prefix: '/api' });
  fastify.register(logoutRoute, { prefix: '/api' });
  fastify.register(refreshTokenRoute, { prefix: '/api' });
  fastify.register(signUpRoute, { prefix: '/api' });

  // !WORKAROUND: autoLoad is not working with vitest if the provided folder contains any file that is not a registrable plugin
  // fastify.register(autoLoad, {
  //   dir: join(__dirname, 'modules'),
  //   dirNameRoutePrefix: false,
  //   matchFilter: path => minimatch(path, '**/routes/*.ts'),
  //   options: {
  //     prefix: '/api'
  //   }
  // });

  fastify.get('/ping', (_, reply) => {
    reply.send({ ping: 'pong' });
  });

  return fastify;
}
