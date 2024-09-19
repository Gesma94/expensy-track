import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";
import type { UserPayload } from "../common/schemas/user-schema.js";
import { CookieName } from "../common/enums/cookie-name.js";
import { FastifyPluginName } from "../common/enums/fastify-plugin-name.js";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: UserPayload;
  }
}

export default fp(
  async (fastify: FastifyInstance) => {
    fastify.register(fastifyJwt, {
      secret: fastify.env.JWT_SECRET_KEY,
      cookie: {
        signed: true,
        cookieName: CookieName.AccessToken,
      },
    });
  },
  {
    name: FastifyPluginName.Jwt,
    dependencies: [FastifyPluginName.Env],
  },
);
