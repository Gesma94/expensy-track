import { type ReplyAuthenticate, UserPayloadSchema } from '@expensy-track/common/schemas';
import type { FastifyPluginAsync } from 'fastify';
import { getFastifySchemaWithError } from '../../../common/utils/get-fastify-schema-with-error.js';
import { authHook } from '../hooks/auth-hook.js';

type RouteInterface = {
  Reply: ReplyAuthenticate;
};

const schema = getFastifySchemaWithError(UserPayloadSchema);

const authenticateRoute: FastifyPluginAsync = async fastify => {
  fastify.get<RouteInterface>('/authenticate', { schema, onRequest: [authHook] }, (request, reply) => {
    return reply.send({ ...request.user });
  });
};

export default authenticateRoute;
