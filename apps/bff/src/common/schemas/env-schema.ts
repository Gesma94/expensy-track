import { type Static, Type } from '@sinclair/typebox';

export const EnvSchema = Type.Object({
  NODE_ENV: Type.Union([
    Type.Literal('production'),
    Type.Literal('test'),
    Type.Literal('development'),
    Type.Literal('e2e')
  ]),
  CORS_ORIGIN: Type.String(),
  COOKIE_SECRET_KEY: Type.String(),
  JWT_SECRET_KEY: Type.String(),
  FIREBASE_PROJECT_ID: Type.String(),
  FIREBASE_CLIENT_EMAIL: Type.String(),
  FIREBASE_PRIVATE_KEY: Type.String(),
  DATABASE_URL: Type.String(),
  PORT: Type.Optional(Type.Number())
});

export type Environment = Static<typeof EnvSchema>;
