import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { UserPayload } from '@expensy-track/common/schemas';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import mercurius from 'mercurius';
import { authResolvers } from '../modules/auth/graphql/resolvers.js';
import { categoryResolvers } from '../modules/category/graphql/resolvers.js';
import { labelResolvers } from '../modules/label/graphql/resolvers.js';
import { transactionLoaders } from '../modules/transaction/loaders.js';
import { transactionResolvers } from '../modules/transaction/resolvers.js';
import { walletLoaders } from '../modules/wallet/loaders.js';
import { walletResolvers } from '../modules/wallet/resolvers.js';

declare module 'mercurius' {
  interface MercuriusContext {
    user: UserPayload | null;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// !WORKAROUND: loadFileSync is not working with vitest and ts files; manually loading all resolvers here
// const resolverArray = loadFilesSync(path.join(__dirname, "./../modules/**/resolvers.ts"));
const typeDefArray = loadFilesSync(path.join(__dirname, './../**/*.graphql'));

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typeDefArray),
  resolvers: mergeResolvers([categoryResolvers, authResolvers, labelResolvers, walletResolvers, transactionResolvers])
});

type MercuriusAdditionalContext = {
  user: UserPayload | null;
};

async function buildContext(request: FastifyRequest): Promise<MercuriusAdditionalContext> {
  try {
    await request.jwtVerify({ onlyCookie: true });
    return {
      user: request.user
    };
  } catch (error) {
    return {
      user: null
    };
  }
}

export default fp((fastify, _, done) => {
  fastify.register(mercurius, {
    schema,
    context: buildContext,
    loaders: { ...transactionLoaders, ...walletLoaders },
    graphiql: fastify.env.NODE_ENV === 'development'
  });

  done();
});
