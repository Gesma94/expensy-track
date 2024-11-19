import type { MercuriusContext } from 'mercurius';
import type { QueryResolvers } from '#gql/graphql-generated.js';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import { TransactionToGraphql } from '../mappers/transaction.js';

export const queryTransactions: QueryResolvers<MercuriusContext>['transactions'] = async (
  _parent,
  args,
  contextValue
) => {
  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const transactions = await contextValue.app.prisma.transaction.findMany({
    where: {
      AND: {
        userId: contextValue.user.id,
        walletId: args.input?.walletId
      }
    }
  });

  return getGqlSuccessResponse(transactions.map(TransactionToGraphql).filter(x => x !== null));
};
