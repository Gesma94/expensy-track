import { gql } from '../../../gql';

export const MY_LABEL_FRAGMENT = gql(`
  fragment MyLabel on Label {
    id
    displayName
  }
`);
