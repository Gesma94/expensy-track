import { gql } from '../../../gql';

export const MY_WALLET_FRAGMENT = gql(`
  fragment MyWallet on Wallet {
  id
  displayName
  icon
  initialBalance
  currencyCode
  ownerId
  }
`);
