import type { MercuriusContext } from 'mercurius';
import { GraphqlErrorCode, type MutationResolvers } from '#gql/graphql-generated.js';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import { getGqlUnsuccessResponse } from '#utils/get-gql-unsuccess-response.js';
import { TransactionToGraphql } from '../mappers/transaction.js';

export const mutationCreateTransaction: MutationResolvers<MercuriusContext>['createTransaction'] = async (
  _parent,
  args,
  contextValue
) => {
  const user = contextValue.user;
  const { amount, categoryId, date, isParent, labelsIds, note, walletId } = args.input;

  if (!user) {
    return getGqlUnauthorizedResponse();
  }

  const wallet = await contextValue.app.prisma.wallet.findUnique({
    where: {
      id: walletId,
      OR: [{ ownerId: user.id }, { guests: { some: { userId: user.id } } }]
    }
  });

  if (!wallet) {
    return getGqlUnsuccessResponse(GraphqlErrorCode.WalletNotGound, 'wallet with given id not found');
  }

  const result = await contextValue.app.prisma.$transaction(async tx => {
    const transaction = await tx.transaction.create({
      data: {
        note,
        date,
        amount,
        walletId,
        isParent,
        categoryId,
        userId: user.id
      }
    });

    if (labelsIds && labelsIds?.length > 0) {
      await tx.labelsOnTransactions.createMany({
        data: labelsIds.map(labelId => ({
          labelId,
          transactionId: transaction.id
        }))
      });
    }

    return transaction;
  });

  return getGqlSuccessResponse(TransactionToGraphql(result));
};
