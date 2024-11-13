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

export const MY_CATEGORY_FRAGMENT = gql(`
  fragment MyCategory on Category {
    id
    displayName
    type
    color
    icon
  }
`);

export const WALLET_KEY_VALUE_FRAGMENT = gql(`
  fragment WalletKeyValueFragment on Wallet {
    id
    displayName
    icon
  }
`);
