import { gql } from '@gql/gql';

export const CATEGORY_LIST_ELEMENT = gql(`
  fragment CategoryListElement on Category {
    id
    icon
    color
    type
    displayName
  }
`);

export const CATEGORY_LIST_ELEMENT_WITH_SUBS = gql(`
  fragment CategoryListElementWithSubs on Category {
    id
    ...CategoryListElement
    subCategories {
      ...CategoryListElement
    }
  }
`);

export const CATEGORIES_BY_TYPE = gql(`
  fragment CategoriesGroupedByType on CategoriesByType {
    counter
    categories { ...CategoryListElementWithSubs }
  }  
`);
