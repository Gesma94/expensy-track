import { Type, type Static } from "@sinclair/typebox";
import type { FastifyPluginAsync, FastifySchema } from "fastify";
import { getUserPayload } from "../../../common/utils/get-user-payload.js";
import { $Enums } from "@expensy-track/prisma";
import { getReplySchemaWithError } from "@expensy-track/common/utils";
import { ResponseErrorSchema, UserPayloadSchema } from "@expensy-track/common/schemas";
import { ErrorCode } from "@expensy-track/common/enums";

const ReplySchema = getReplySchemaWithError(UserPayloadSchema);

const BodySchema = Type.Object({
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

const loginRoute: FastifyPluginAsync = async fastify => {
  fastify.post<RouteInterface>("/login", { schema }, async (request, reply) => {
    const { email, password } = request.body;

    const user = await fastify.prisma.user.findFirst({
      where: { email, provider: $Enums.UserProvider.EMAIL },
    });

    if (!user || !fastify.bcrypt.compareSync(password, user.password)) {
      return reply.status(400).send({
        error: {
          statusCode: 400,
          name: "InvalidCredentials",
          code: ErrorCode.ET_InvalidCredentials,
          message: "User not found with provided credentials",
        },
      });
    }

    return reply.getAndSetAuthCookies(user).status(200).send(getUserPayload(user));
  });
};

export default loginRoute;
