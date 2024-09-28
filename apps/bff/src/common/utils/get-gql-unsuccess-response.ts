import type { GraphqlErrorCode } from "../../@types/graphql-generated.js";
import type { GqlResponseType } from "../types/gql-response-type.js";

export function getGqlUnsuccessResponse<T = unknown>(
  errorCode: GraphqlErrorCode,
  errorMessage: string,
  result?: T,
): GqlResponseType<T> {
  return {
    result,
    success: false,
    error: {
      code: errorCode,
      message: errorMessage,
    },
  };
}
