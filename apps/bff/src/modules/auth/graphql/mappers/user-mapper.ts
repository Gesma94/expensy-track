import type { User as UserPrisma } from '@expensy-track/prisma';
import type { User as UserGraphql } from '../../../../@types/graphql-generated.js';
import { UserProviderToGraphql, UserProviderToPrisma } from './user-provider-mapper.js';

export function UserToPrisma(user: UserGraphql | null): UserPrisma | null {
  if (user === null) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    firebase_uid: user.firebaseUid ?? null,
    firstName: user.firstName,
    lastName: user.lastName,
    provider: UserProviderToPrisma(user.provider),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    password: null
  };
}

export function UserToGraphql(user: UserPrisma | null): UserGraphql | null {
  if (user === null) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    firebaseUid: user.firebase_uid,
    firstName: user.firstName,
    lastName: user.lastName,
    provider: UserProviderToGraphql(user.provider),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    categories: []
  };
}
