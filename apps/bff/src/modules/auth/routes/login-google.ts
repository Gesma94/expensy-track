import { ErrorCode } from '@expensy-track/common/enums';
import { UserPayloadSchema } from '@expensy-track/common/schemas';
import { getReplySchemaWithError } from '@expensy-track/common/utils';
import { $Enums } from '@expensy-track/prisma';
import { type Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync } from 'fastify';
import { getFastifySchemaWithError } from '../../../common/utils/get-fastify-schema-with-error.js';
import { getInvalidCredentialsRestError } from '../../../common/utils/get-invalid-credentials-rest-error.js';
import { getUserPayload } from '../../../common/utils/get-user-payload.js';

const ReplySchema = getReplySchemaWithError(UserPayloadSchema);
const BodySchema = Type.Object({
  idToken: Type.String(),
  lastName: Type.String(),
  firstName: Type.String()
});

const schema = getFastifySchemaWithError(UserPayloadSchema, BodySchema);

type RouteInterface = {
  Body: Static<typeof BodySchema>;
  Reply: Static<typeof ReplySchema>;
};

const loginGoogleRoute: FastifyPluginAsync = async fastify => {
  fastify.post<RouteInterface>('/login/google', { schema }, async (request, reply) => {
    const { firstName, idToken, lastName } = request.body;
    const decodedToken = await fastify.firebase.auth.verifyIdToken(idToken);

    if (!decodedToken.email) {
      return reply.code(400).send(getInvalidCredentialsRestError());
    }

    let user = await fastify.prisma.user.findUnique({
      where: {
        email: decodedToken.email,
        firebase_uid: decodedToken.uid,
        provider: $Enums.UserProvider.GOOGLE
      }
    });

    if (!user) {
      try {
        user = await fastify.prisma.user.create({
          data: {
            lastName,
            firstName,
            email: decodedToken.email,
            firebase_uid: decodedToken.uid,
            provider: $Enums.UserProvider.GOOGLE
          }
        });
      } catch (error) {
        fastify.log.error(error, 'could not register the new user when logging via Google');

        return reply.status(400).send({
          statusCode: 400,
          name: 'UserRegistrationFailed',
          code: ErrorCode.ET_UserRegistrationFailed,
          message: 'Could not register the new user'
        });
      }
    }

    reply.getAndSetAuthCookies(user).status(200).send(getUserPayload(user));
  });
};

export default loginGoogleRoute;
