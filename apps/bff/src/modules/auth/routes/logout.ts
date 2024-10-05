import { ErrorCode } from '@expensy-track/common/enums';
import { RestErrorSchema } from '@expensy-track/common/schemas';
import { type Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync, FastifySchema } from 'fastify';

const ReplySchema = Type.Union([Type.Boolean(), RestErrorSchema]);

const schema: FastifySchema = {
  response: {
    200: Type.Boolean(),
    400: RestErrorSchema
  }
};

type RouteInterface = {
  Reply: Static<typeof ReplySchema>;
};

const logoutRoute: FastifyPluginAsync = async fastify => {
  fastify.get<RouteInterface>('/logout', { schema }, async (request, reply) => {
    try {
      await request.jwtVerify({ onlyCookie: true });
    } catch (error) {
      return reply.status(400).send({
        statusCode: 400,
        name: 'UserUnauthorized',
        code: ErrorCode.ET_UserUnauthorized,
        message: 'User is not authorized'
      });
    }
    return reply.removeAuthCookies().status(200).send(true);
  });
};

export default logoutRoute;
