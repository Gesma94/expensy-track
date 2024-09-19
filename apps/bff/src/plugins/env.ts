import fp from "fastify-plugin";
import fastifyEnv from "@fastify/env";
import type { FastifyInstance } from "fastify";
import { EnvSchema, type Environment } from "../common/schemas/env-schema.js";
import { FastifyPluginName } from "../common/enums/fastify-plugin-name.js";

declare module "fastify" {
  interface FastifyInstance {
    [FastifyPluginName.Env]: Environment;
  }
}

type Options = {
  customEnvs?: Partial<Environment>;
};

export default fp<Options>(
  async (fastify: FastifyInstance, options) => {
    fastify.register(fastifyEnv, {
      dotenv: true,
      schema: EnvSchema,
      data: Object.assign(process.env, options.customEnvs),
      confKey: FastifyPluginName.Env,
    });
  },
  {
    name: FastifyPluginName.Env,
  },
);
