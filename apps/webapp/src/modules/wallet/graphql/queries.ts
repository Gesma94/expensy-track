import { gql } from '../../../gql';

export const GET_MY_WALLETS = gql(`
  query GetMyWallets {
    wallets {
      success
      error { ... GraphqlError }
      result { ... MyWallet }
    }
  }
`);
