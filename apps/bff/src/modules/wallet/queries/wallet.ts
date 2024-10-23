import type { MercuriusContext } from 'mercurius';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import type { QueryResolvers } from '../../../@types/graphql-generated.js';
import { WalletToGraphql } from '../mappers/wallet.js';

export const queryWallet: QueryResolvers<MercuriusContext>['wallet'] = async (_parent, args, contextValue) => {
  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const wallet = await contextValue.app.prisma.wallet.findUnique({
    where: {
      id: args.input.id,
      OR: [
        { ownerId: contextValue.user.id },
        {
          guests: {
            some: {
              userId: contextValue.user.id
            }
          }
        }
      ]
    }
  });

  return getGqlSuccessResponse(WalletToGraphql(wallet));
};
