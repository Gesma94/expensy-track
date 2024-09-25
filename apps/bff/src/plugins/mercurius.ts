import fp from "fastify-plugin";
import type { FastifyInstance, FastifyRequest } from "fastify";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";
import { fileURLToPath } from "url";
import mercurius from "mercurius";
import { loadFilesSync } from "@graphql-tools/load-files";
import type { UserPayload } from "@expensy-track/common/schemas";
import { categoryResolvers } from "../modules/category/graphql/resolvers.js";
import { authResolvers } from "../modules/auth/graphql/resolvers.js";

declare module "mercurius" {
  interface MercuriusContext {
    user: UserPayload | null;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// !WORKAROUND: loadFileSync is not working with vitest and ts files; manually loading all resolvers here
// const resolverArray = loadFilesSync(path.join(__dirname, "./../modules/**/resolvers.ts"));
const typeDefArray = loadFilesSync(path.join(__dirname, "./../**/*.graphql"));

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefArray),
  resolvers: mergeResolvers([categoryResolvers, authResolvers]),
});

type MercuriusAdditionalContext = {
  user: UserPayload | null;
};

async function buildContext(request: FastifyRequest): Promise<MercuriusAdditionalContext> {
  try {
    await request.jwtVerify({ onlyCookie: true });
    return {
      user: request.user,
    };
  } catch (error) {
    return {
      user: null,
    };
  }
}

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(mercurius, {
    schema,
    context: buildContext,
    graphiql: fastify.env.NODE_ENV === "development",
  });
});
