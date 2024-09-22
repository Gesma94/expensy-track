import type { FastifyPluginAsync, FastifySchema } from "fastify";
import { isErrorSchema } from "@expensy-track/common/utils";
import { ResponseErrorSchema, UserPayloadSchema, type ReplyAuthenticate } from "@expensy-track/common/schemas";
import { ErrorCode } from "@expensy-track/common/enums";

const schema: FastifySchema = {
  response: {
    200: UserPayloadSchema,
    400: ResponseErrorSchema,
  },
};

type RouteInterface = {
  Reply: ReplyAuthenticate;
};

const authenticateRoute: FastifyPluginAsync = async fastify => {
  fastify.get<RouteInterface>("/authenticate", { schema }, async (request, reply) => {
    try {
      await request.jwtVerify({ onlyCookie: true });
      return reply.send({ ...request.user });
    } catch (error) {
      if (isErrorSchema(error)) {
        if (error.code !== ErrorCode.FST_JwyAuthorizationTokenExpired) {
          return reply.status(401).send({ error });
        }
      } else {
        return reply.status(401).send({
          error: {
            code: ErrorCode.ET_InvalidAccessToken,
            message: "Invalid access token was found in request.cookies",
            name: "InvalidAccessToken",
            statusCode: 401,
          },
        });
      }
    }

    const { refreshToken } = request.cookies;

    if (!refreshToken) {
      return reply.status(401).send({
        error: {
          code: ErrorCode.ET_InvalidRefreshToken,
          message: "Invalid refresh token was found in request.cookies",
          name: "InvalidRefreshToken",
          statusCode: 401,
        },
      });
    }

    try {
      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        userPayload,
      } = fastify.tokens.refreshTokens(refreshToken);

      return reply.setAuthCookies(newAccessToken, newRefreshToken).status(200).send(userPayload);
    } catch (error) {
      fastify.log.error(error, "invalid refresh token in request cookies");

      return reply.status(401).send({
        error: {
          code: ErrorCode.ET_InvalidRefreshToken,
          message: "Invalid refresh token was found in request.cookies",
          name: "InvalidRefreshToken",
          statusCode: 401,
        },
      });
    }
  });
};

export default authenticateRoute;
