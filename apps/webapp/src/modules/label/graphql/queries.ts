import { gql } from '../../../gql';

export const GET_MY_LABELS = gql(`
  query GetMyLabels {
    labels {
      success
      error { ... GraphqlError }
      result { ... MyLabel }
    }
  }
`);
