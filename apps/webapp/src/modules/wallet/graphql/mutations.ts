import { gql } from '../../../gql';

export const CREATE_WALLET = gql(`
    mutation CreateWallet($input: CreateWalletInput!) {
    createWallet(input: $input) {
        success
        error { ... GraphqlError }
        result { ... MyWallet }
    }
}
`);

export const DELETE_CATEGORIES = gql(`
mutation DeleteWallet($input: DeleteWalletsInput!) {
  deleteWallets(input: $input) {
      success
      error { ... GraphqlError }
      result
  }
}
`);
