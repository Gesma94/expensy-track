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

export const GET_MY_WALLET = gql(`
  query GetMyWallet($input: WalletInput!, $transactionDateTimeRange: DateTimeRange) {
    wallet(input: $input) {
      success
      error { ... GraphqlError }
      result { ... MyWalletWithTransactions }
  }
  
  labels {
      success
      error { ... GraphqlError }
      result { ... MyLabel }
    }
  }
`);
