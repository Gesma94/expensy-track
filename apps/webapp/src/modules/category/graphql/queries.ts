import { gql } from '../../../gql';

export const GET_MY_CATEGORIES = gql(`
  query GetMyCategories {
    categories {
      success
      error { ... GraphqlError }
      result { ... MyCategory }
    }
  }
`);
