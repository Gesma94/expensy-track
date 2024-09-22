import { Type, type Static } from "@sinclair/typebox";
import type { FastifyPluginAsync, FastifySchema } from "fastify";
import { getUserPayload } from "../../../common/utils/get-user-payload.js";
import { $Enums } from "@expensy-track/prisma";
import { getReplySchemaWithError, hasErrorSchema } from "@expensy-track/common/utils";
import { ResponseErrorSchema, UserPayloadSchema } from "@expensy-track/common/schemas";
import { ErrorCode } from "@expensy-track/common/enums";

const ReplySchema = getReplySchemaWithError(UserPayloadSchema);

const BodySchema = Type.Object({
  lastName: Type.String(),
  firstName: Type.String(),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 6 }),
});

const schema: FastifySchema = {
  body: BodySchema,
  response: {
    200: UserPayloadSchema,
    400: ResponseErrorSchema,
  },
};

type RouteInterface = {
  Body: Static<typeof BodySchema>;
  Reply: Static<typeof ReplySchema>;
};

const signUpRoute: FastifyPluginAsync = async fastify => {
  fastify.post<RouteInterface>("/sign-up", { schema }, async (request, reply) => {
    const { email, password, lastName, firstName } = request.body;

    const alreadyExistingUser = await fastify.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (alreadyExistingUser) {
      return reply.status(400).send({
        error: {
          statusCode: 400,
          name: "EmailAlreadyUsed",
          message: "Email is already used",
          code: ErrorCode.ET_EmailAlreadyUsed,
        },
      });
    }

    try {
      const newUser = await fastify.prisma.user.create({
        data: {
          email,
          lastName,
          firstName,
          provider: $Enums.UserProvider.EMAIL,
          password: fastify.bcrypt.hashSync(password),
        },
      });

      return reply.getAndSetAuthCookies(newUser).status(200).send(getUserPayload(newUser));
    } catch (error) {
      if (hasErrorSchema(error)) {
        return reply.status(400).send({ error });
      }

      return reply.status(400).send({
        error: {
          statusCode: 400,
          name: "UserRegistrationFailed",
          code: ErrorCode.ET_UserRegistrationFailed,
          message: "Could not register the new user",
        },
      });
    }
  });
};

export default signUpRoute;
