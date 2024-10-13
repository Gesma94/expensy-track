import type { Resolvers } from '../../@types/graphql-generated.js';
import { mutationCreateWallet } from './mutations/create-wallet.js';
import { mutationDeleteWallets } from './mutations/delete-wallet.js';
import { queryWallets } from './queries/wallets.js';

export const walletResolvers: Resolvers = {
  Query: {
    wallets: queryWallets
  },
  Mutation: {
    createWallet: mutationCreateWallet,
    deleteWallets: mutationDeleteWallets
  }
};
