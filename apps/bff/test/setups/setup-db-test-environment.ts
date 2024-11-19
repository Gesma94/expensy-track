import { execSync } from 'node:child_process';
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import type { FastifyInstance } from 'fastify';
import { createMercuriusTestClient } from 'mercurius-integration-testing';
import { afterEach, beforeEach } from 'vitest';
import { buildFastify } from '../../src/app.js';

export type DbTestEnvironmentContext = {
  app: FastifyInstance;
  dbContainer: StartedPostgreSqlContainer;
  mercuriusClient: ReturnType<typeof createMercuriusTestClient>;
};

export async function beforeEachSetupDbTestEnvironment(context: DbTestEnvironmentContext) {
  try {
    context.dbContainer = await new PostgreSqlContainer().start();

    const customEnvs = {
      NODE_ENV: 'test',
      DATABASE_URL: context.dbContainer.getConnectionUri(),
      JWT_SECRET_KEY: 'rebirth-subsector-heave-fragile-obsession-giddily-pancake-jaywalker-darkened-whooping'
    } as const;

    execSync('pnpm --filter prisma migrate:deploy', { env: { ...customEnvs } });

    context.app = await buildFastify({ customEnvs });
    context.mercuriusClient = createMercuriusTestClient(context.app);

    await context.app.listen({ port: 0, host: '0.0.0.0' });
    await context.app.ready();
  } catch (error) {
    console.error('Error while executing setup for test with DB environment');
    throw error;
  }
}

export async function afterEachSetupDbTestEnvironment(context: DbTestEnvironmentContext) {
  await context.dbContainer?.stop();
  await context.app?.close();
}

export function setupDbTestEnvironment() {
  beforeEach<DbTestEnvironmentContext>(beforeEachSetupDbTestEnvironment);
  afterEach<DbTestEnvironmentContext>(afterEachSetupDbTestEnvironment);
}
