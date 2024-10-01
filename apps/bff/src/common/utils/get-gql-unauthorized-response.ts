import { GraphqlErrorCode } from '../../@types/graphql-generated.js';
import type { GqlResponseType } from '../types/gql-response-type.js';
import { getGqlUnsuccessResponse } from './get-gql-unsuccess-response.js';

export function getGqlUnauthorizedResponse<T = unknown>(result?: T): GqlResponseType<T> {
  return getGqlUnsuccessResponse(GraphqlErrorCode.UnauthorizedUser, 'user not authorized', result);
}
