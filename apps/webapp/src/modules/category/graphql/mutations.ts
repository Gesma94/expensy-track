import { gql } from "../../../gql";

export const CREATE_CATEGORY = gql(`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      success
      error { ... GraphqlError }
      result { ... MyCategory }
    }
  }
`);
