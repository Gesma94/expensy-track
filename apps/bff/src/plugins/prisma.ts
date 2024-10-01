import { PrismaClient } from '@expensy-track/prisma';
import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { FastifyPluginName } from '../common/enums/fastify-plugin-name.js';

declare module 'fastify' {
  interface FastifyInstance {
    [FastifyPluginName.Prisma]: PrismaClient;
  }
}

export default fp(
  async (fastify: FastifyInstance) => {
    const prismaClient = new PrismaClient({
      datasourceUrl: fastify.env.DATABASE_URL
    });

    await prismaClient.$connect();

    fastify.decorate(FastifyPluginName.Prisma, prismaClient);

    fastify.addHook('onClose', async innerFastify => {
      innerFastify.log.info('disconnecting Prisma from DB');
      await prismaClient.$disconnect();
    });
  },
  {
    name: FastifyPluginName.Prisma,
    dependencies: [FastifyPluginName.Env]
  }
);
