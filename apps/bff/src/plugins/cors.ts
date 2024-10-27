import cors from '@fastify/cors';
import fp from 'fastify-plugin';
import { FastifyPluginName } from '../common/enums/fastify-plugin-name.js';

export default fp(
  (fastify, _, done) => {
    fastify.register(cors, {
      origin: fastify.env.CORS_ORIGIN,
      credentials: true
    });

    done();
  },
  {
    dependencies: [FastifyPluginName.Env]
  }
);
