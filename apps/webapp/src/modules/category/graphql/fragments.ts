import { gql } from "../../../gql";

export const MY_CATEGORY_FRAGMENT = gql(`
  fragment MyCategory on Category {
    id
    displayName
    type
    color
    icon
  }
`);
