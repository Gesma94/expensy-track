import type { GqlResponseType } from "../types/gql-response-type.js";

export function getGqlSuccessResponse<T>(result: T): GqlResponseType<T> {
  return {
    result,
    success: true,
    error: null,
  };
}
