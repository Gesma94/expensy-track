import type { Response } from '#gql/graphql-generated.js';

export type GqlResponseType<T> = Response & {
  result?: T;
};
