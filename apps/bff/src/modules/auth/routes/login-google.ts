import { Type, type Static } from "@sinclair/typebox";
import type { FastifyPluginAsync, FastifySchema } from "fastify";
import { getReplySchemaWithError, ResponseErrorSchema } from "../../../common/schemas/response-error-schema.js";
import { UserPayloadSchema } from "../../../common/schemas/user-schema.js";
import { getUserPayload } from "../../../common/utils/get-user-payload.js";
import { ErrorCode } from "../../../common/enums/error-code.js";
import { $Enums } from "@expensy-track/prisma";

const ReplySchema = getReplySchemaWithError(UserPayloadSchema);

const BodySchema = Type.Object({
  idToken: Type.String(),
  lastName: Type.String(),
  firstName: Type.String(),
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

const loginGoogleRoute: FastifyPluginAsync = async fastify => {
  fastify.post<RouteInterface>("/login/google", { schema }, async (request, reply) => {
    const { firstName, idToken, lastName } = request.body;
    const decodedToken = await fastify.firebase.auth.verifyIdToken(idToken);

    if (!decodedToken.email) {
      return reply.code(400).send({
        error: {
          code: ErrorCode.ET_InvalidGoogleIdToken,
          message: "Invalid google ID token",
          name: "InvalidGoogleIdToken",
          statusCode: 401,
        },
      });
    }

    let user = await fastify.prisma.user.findUnique({
      where: { email: decodedToken.email, firebase_uid: decodedToken.uid, provider: $Enums.UserProvider.GOOGLE },
    });

    if (!user) {
      try {
        user = await fastify.prisma.user.create({
          data: {
            lastName,
            firstName,
            email: decodedToken.email,
            firebase_uid: decodedToken.uid,
            provider: $Enums.UserProvider.GOOGLE,
          },
        });
      } catch (error) {
        fastify.log.error(error, "could not register the new user when logging via Google");

        return reply.status(400).send({
          error: {
            statusCode: 400,
            name: "UserRegistrationFailed",
            code: ErrorCode.ET_UserRegistrationFailed,
            message: "Could not register the new user",
          },
        });
      }
    }

    reply.getAndSetAuthCookies(user).status(200).send(getUserPayload(user));
  });
};

export default loginGoogleRoute;
