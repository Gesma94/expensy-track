import { ErrorCode } from '@expensy-track/common/enums';
import { UserPayloadSchema } from '@expensy-track/common/schemas';
import { getReplySchemaWithError } from '@expensy-track/common/utils';
import { $Enums } from '@expensy-track/prisma';
import { type Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync } from 'fastify';
import { getFastifySchemaWithError } from '#utils/get-fastify-schema-with-error.js';
import { getUserPayload } from '#utils/get-user-payload.js';

const ReplySchema = getReplySchemaWithError(UserPayloadSchema);
const BodySchema = Type.Object({
  lastName: Type.String(),
  firstName: Type.String(),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 })
});

const schema = getFastifySchemaWithError(UserPayloadSchema, BodySchema);

type RouteInterface = {
  Body: Static<typeof BodySchema>;
  Reply: Static<typeof ReplySchema>;
};

const signUpRoute: FastifyPluginAsync = async fastify => {
  fastify.post<RouteInterface>('/sign-up', { schema }, async (request, reply) => {
    const { email, password, lastName, firstName } = request.body;

    const alreadyExistingUser = await fastify.prisma.user.findFirst({
      where: {
        email
      }
    });

    if (alreadyExistingUser) {
      return reply.status(400).send({
        statusCode: 400,
        name: 'EmailAlreadyUsed',
        message: 'Email is already used',
        code: ErrorCode.ET_EmailAlreadyUsed
      });
    }

    try {
      const newUser = await fastify.prisma.user.create({
        data: {
          email,
          lastName,
          firstName,
          provider: $Enums.UserProvider.EMAIL,
          password: fastify.bcrypt.hashSync(password)
        }
      });

      return reply.getAndSetAuthCookies(newUser).status(200).send(getUserPayload(newUser));
    } catch (error) {
      return reply.status(400).send({
        statusCode: 400,
        name: 'UserRegistrationFailed',
        code: ErrorCode.ET_UserRegistrationFailed,
        message: 'Could not register the new user'
      });
    }
  });
};

export default signUpRoute;
