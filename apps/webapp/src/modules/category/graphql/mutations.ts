import { gql } from '../../../gql';

export const CREATE_CATEGORY = gql(`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      success
      error { ... GraphqlError }
      result { ... MyCategory }
    }
  }
`);

export const DELETE_CATEGORIES = gql(`
mutation DeleteCategories($input: DeleteCategoriesInput!) {
  deleteCategories(input: $input) {
      success
      error { ... GraphqlError }
      result
  }
}
`);

export const EDIT_CATEGORY = gql(`
  mutation EditCategory($input: EditCategoryInput!) {
    editCategory(input: $input) {
      success
      error { ... GraphqlError }
      result { ... MyCategory }
    }
  }  
`);
