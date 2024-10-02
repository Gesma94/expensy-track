import { type Static, Type } from '@sinclair/typebox';
import { UserProvider } from '../enums/user-provider.js';

export const UserPayloadSchema = Type.Object({
  id: Type.String(),
  email: Type.String(),
  lastName: Type.String(),
  firstName: Type.String(),
  provider: Type.Enum(UserProvider)
});

export type UserPayload = Static<typeof UserPayloadSchema>;
