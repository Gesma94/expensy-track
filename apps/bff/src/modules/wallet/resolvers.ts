import type { Resolvers } from '../../@types/graphql-generated.js';
import { mutationCreateWallet } from './mutations/create-wallet.js';
import { mutationDeleteWallets } from './mutations/delete-wallet.js';
import { queryWallet } from './queries/wallet.js';
import { queryWallets } from './queries/wallets.js';

export const walletResolvers: Resolvers = {
  Query: {
    wallet: queryWallet,
    wallets: queryWallets
  },
  Mutation: {
    createWallet: mutationCreateWallet,
    deleteWallets: mutationDeleteWallets
  }
};
