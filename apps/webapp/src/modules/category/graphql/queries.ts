import { gql } from '../../../gql';

export const GET_CATEGORIES_BY_TYPE = gql(`
  query GetCategoriesByType {
    categoriesByType {
      success
      error { ... GraphqlError }
      result {
        incomeCategories {
          counter
          categories  {... CategoryListElementWithSubs }
        }
        expanseCategories {
          counter
          categories { ... CategoryListElementWithSubs }
        }
      }
    }
  }
`);
