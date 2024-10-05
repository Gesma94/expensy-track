import { ErrorCode } from '@expensy-track/common/enums';
import type { FastifyReply, FastifyRequest } from 'fastify';

export const authHook = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify({ onlyCookie: true });

    const user = await request.server.prisma.user.findUnique({
      where: { id: request.user.id }
    });

    if (!user) {
      reply.removeAuthCookies();

      return reply.status(401).send({
        statusCode: 401,
        name: 'UserNotExist',
        code: ErrorCode.ET_UserNotExist,
        message: 'User does not exist'
      });
    }
  } catch (error) {
    return reply.status(401).send({
      statusCode: 401,
      name: 'UserUnauthorized',
      code: ErrorCode.ET_UserUnauthorized,
      message: 'User is not authorized'
    });
  }
};
