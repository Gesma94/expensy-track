import { gql } from "../../../gql";

export const GRAPHQL_ERROR_FRAGMENT = gql(`
  fragment GraphqlError on GraphqlError {
    message
    code
  }
`);
