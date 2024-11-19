import type { MercuriusContext } from 'mercurius';
import type { QueryResolvers } from '#gql/graphql-generated.js';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import { WalletToGraphql } from '../mappers/wallet.js';

export const queryWallets: QueryResolvers<MercuriusContext>['wallets'] = async (_parent, _args, contextValue) => {
  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const wallets = await contextValue.app.prisma.wallet.findMany({
    where: { OR: [{ ownerId: contextValue.user.id }, { guests: { some: { userId: contextValue.user.id } } }] }
  });

  return getGqlSuccessResponse(wallets.map(WalletToGraphql).filter(x => x !== null));
};
