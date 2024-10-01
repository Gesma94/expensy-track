import fastifyCookie from '@fastify/cookie';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { FastifyPluginName } from '../common/enums/fastify-plugin-name.js';

export default fp(
  async (fastify: FastifyInstance) => {
    fastify.register(fastifyCookie, {
      secret: fastify.env.COOKIE_SECRET_KEY
    });
  },
  {
    name: FastifyPluginName.Cookie,
    dependencies: [FastifyPluginName.Env]
  }
);
