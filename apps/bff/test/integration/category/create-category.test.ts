import { describe, it } from 'vitest';
import { createFakeUser } from '../../factories/user-factory.js';
import { type DbTestEnvironmentContext, setupDbTestEnvironment } from '../../setups/setup-db-test-environment.js';

describe('Create category', () => {
  setupDbTestEnvironment();

  it<DbTestEnvironmentContext>('test 1', async ({ app, expect }) => {
    const user = createFakeUser({ password: app.bcrypt.hashSync('password') });
    await app.prisma.user.create({ data: user });
    expect(await app.prisma.user.count()).toBe(1);
  });
});
