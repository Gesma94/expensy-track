import type { $Utils } from '@expensy-track/prisma';
import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import type { Transaction as GraphqlTransaction } from '../../../@types/graphql-generated.js';
import { TransactionToGraphql } from '../../transaction/mappers/transaction.js';

export const walletTransactionsLoader: Required<MercuriusLoaderTyped>['Wallet']['transactions'] = async (
  queries,
  context
) => {
  const orClauses: $Utils.OrType<'Transaction'> = [];

  queries.forEach(query => {
    orClauses.push({
      AND: [
        { walletId: query.obj.id },
        { date: { lte: query.params.dateTimeRange.endTime } },
        { date: { gte: query.params.dateTimeRange.startTime } }
      ]
    });
  });

  const graphqlTransactionsByWalletId: { [key: string]: GraphqlTransaction[] } = {};
  const transactions = await context.app.prisma.transaction.findMany({
    where: { OR: orClauses }
  });

  transactions.forEach(transaction => {
    const graphqlTransaction = TransactionToGraphql(transaction);

    if (!graphqlTransaction) {
      return;
    }

    if (!(graphqlTransaction.walletId in graphqlTransactionsByWalletId)) {
      graphqlTransactionsByWalletId[graphqlTransaction.walletId] = [];
    }

    graphqlTransactionsByWalletId[graphqlTransaction.walletId]?.push(graphqlTransaction);
  });

  return queries.map(query => {
    return graphqlTransactionsByWalletId[query.obj.id] ?? [];
  });
};
