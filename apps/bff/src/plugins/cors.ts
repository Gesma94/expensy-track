import fp from "fastify-plugin";
import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import { FastifyPluginName } from "../common/enums/fastify-plugin-name.js";

export default fp(
  async (fastify: FastifyInstance) => {
    fastify.register(cors, {
      origin: fastify.env.CORS_ORIGIN,
      credentials: true,
    });
  },
  {
    dependencies: [FastifyPluginName.Env],
  },
);
