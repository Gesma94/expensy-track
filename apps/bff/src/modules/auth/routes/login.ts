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
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 6 })
});

const schema = getFastifySchemaWithError(UserPayloadSchema, BodySchema);

type RouteInterface = {
  Body: Static<typeof BodySchema>;
  Reply: Static<typeof ReplySchema>;
};

const loginRoute: FastifyPluginAsync = async fastify => {
  fastify.post<RouteInterface>('/login', { schema }, async (request, reply) => {
    const { email, password } = request.body;

    const user = await fastify.prisma.user.findFirst({
      where: { email, provider: $Enums.UserProvider.EMAIL }
    });

    if (!user || !fastify.bcrypt.compareSync(password, user.password)) {
      return reply.status(400).send(getInvalidCredentialsRestError());
    }

    return reply.getAndSetAuthCookies(user).status(200).send(getUserPayload(user));
  });
};

export default loginRoute;
