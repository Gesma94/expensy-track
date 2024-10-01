import type { Response } from '../../@types/graphql-generated.js';

export type GqlResponseType<T> = Response & {
  result?: T;
};
