import { ErrorCode } from '@expensy-track/common/enums';
import { getReplySchemaWithError } from '@expensy-track/common/utils';
import { type Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync } from 'fastify';
import { getFastifySchemaWithError } from '#utils/get-fastify-schema-with-error.js';

const SuccessSchema = Type.Boolean();
const schema = getFastifySchemaWithError(SuccessSchema);
const ReplySchema = getReplySchemaWithError(SuccessSchema);

type RouteInterface = {
  Reply: Static<typeof ReplySchema>;
};

const refreshTokenRoute: FastifyPluginAsync = async fastify => {
  fastify.get<RouteInterface>('/refresh-token', { schema }, async (request, reply) => {
    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      return reply.status(401).send({
        code: ErrorCode.ET_UserUnauthorized,
        message: 'User is not authenticated',
        name: 'UserUnauthorized',
        statusCode: 401
      });
    }

    try {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = fastify.tokens.refreshTokens(refreshToken);
      return reply.setAuthCookies(newAccessToken, newRefreshToken).status(200).send(true);
    } catch (error) {
      fastify.log.error(error, 'invalid refresh token in request cookies');

      return reply.status(401).send({
        code: ErrorCode.ET_UserUnauthorized,
        message: 'User is not authenticated',
        name: 'UserUnauthorized',
        statusCode: 401
      });
    }
  });
};

export default refreshTokenRoute;
