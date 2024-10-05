import { type Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync, FastifySchema } from 'fastify';

const SuccessSchema = Type.Boolean();

const schema: FastifySchema = {
  response: {
    '200': SuccessSchema
  }
};

type RouteInterface = {
  Reply: Static<typeof SuccessSchema>;
};

const logoutRoute: FastifyPluginAsync = async fastify => {
  fastify.get<RouteInterface>('/logout', { schema }, async (_request, reply) => {
    return reply.removeAuthCookies().status(200).send(true);
  });
};

export default logoutRoute;
