import { gql } from '../../gql';

export const GRAPHQL_ERROR_FRAGMENT = gql(`
  fragment GraphqlError on GraphqlError {
    message
    code
  }
`);

export const MY_LABEL_FRAGMENT = gql(`
  fragment MyLabel on Label {
    id
    displayName
  }
`);
