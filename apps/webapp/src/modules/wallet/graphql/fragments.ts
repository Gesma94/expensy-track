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

export const MY_WALLET_WITH_TRANSACTIONS_FRAGMENT = gql(`
  fragment MyWalletWithTransactions on Wallet {
    id
    displayName
    icon
    initialBalance
    currencyCode
    ownerId
    transactions(dateTimeRange: $transactionDateTimeRange) {
    id
    amount
  }
  }
`);
