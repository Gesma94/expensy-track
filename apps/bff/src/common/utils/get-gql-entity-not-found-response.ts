import { GraphqlErrorCode } from '#gql/graphql-generated.js';
import type { GqlResponseType } from '../types/gql-response-type.js';
import { getGqlUnsuccessResponse } from './get-gql-unsuccess-response.js';

export function getGqlEntityNotFoundResponse(message: string): GqlResponseType<null> {
  return getGqlUnsuccessResponse(GraphqlErrorCode.EntityNotFound, message, null);
}
