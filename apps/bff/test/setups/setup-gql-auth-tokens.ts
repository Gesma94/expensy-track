import type { User } from '@expensy-track/prisma';
import type { FastifyInstance } from 'fastify';
import type { createMercuriusTestClient } from 'mercurius-integration-testing';
import { createFakeUser } from '../factories/user-factory.js';

type FuncReturnType = {
  user: User;
  clearPassword: string;
};

export async function setGqlAuthTokens(
  app: FastifyInstance,
  mercuriusClient: ReturnType<typeof createMercuriusTestClient>
): Promise<FuncReturnType> {
  const clearPassword = 'password';
  const hasedPassword = app.bcrypt.hashSync(clearPassword);
  const user = createFakeUser({ password: hasedPassword });

  await app.prisma.user.create({ data: user });

  const response = await app.inject({
    method: 'POST',
    url: '/api/login',
    headers: { 'Content-Type': 'application/json' },
    body: { email: user.email, password: 'password' }
  });

  const setCookieHeader = response.headers['set-cookie'];
  if (setCookieHeader === undefined) {
    throw new Error("header 'set-cookie' is undefined");
  }
  if (typeof setCookieHeader === 'string') {
    throw new Error("header 'set-cookie' is of type string");
  }

  mercuriusClient.headers.cookie = setCookieHeader?.join('; ');

  return { user, clearPassword };
}
