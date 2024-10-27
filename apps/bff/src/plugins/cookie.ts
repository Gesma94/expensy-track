import fastifyCookie from '@fastify/cookie';
import fp from 'fastify-plugin';
import { FastifyPluginName } from '../common/enums/fastify-plugin-name.js';

export default fp(
  (fastify, _, done) => {
    fastify.register(fastifyCookie, {
      secret: fastify.env.COOKIE_SECRET_KEY
    });

    done();
  },
  {
    name: FastifyPluginName.Cookie,
    dependencies: [FastifyPluginName.Env]
  }
);
