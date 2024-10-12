import type { Resolvers } from '../../@types/graphql-generated.js';
import { queryWallets } from './queries/wallets.js';

export const labelResolvers: Resolvers = {
  Query: {
    wallets: queryWallets
  },
  Mutation: {
    // createWallet: null,
    // deleteWallets: null
  }
};
