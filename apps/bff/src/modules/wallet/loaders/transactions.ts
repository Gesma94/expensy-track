import type { $Utils } from '@expensy-track/prisma';
import type { ArrayValues } from 'type-fest';
import type { Transaction as GraphqlTransaction } from '#gql/graphql-generated.js';
import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { TransactionToGraphql } from '../../transaction/mappers/transaction.js';

export const walletTransactionsLoader: Required<MercuriusLoaderTyped>['Wallet']['transactions'] = async (
  queries,
  context
) => {
  const orClauses: $Utils.OrType<'Transaction'> = [];

  queries.forEach(query => {
    // by default, retrieving based only on the walletId
    const orClause: ArrayValues<typeof orClauses> = {
      walletId: query.obj.id
    };

    // if defined, using the dateTimeRange parameter
    if (query.params.dateTimeRange) {
      orClause.date = {
        lte: query.params.dateTimeRange.endTime,
        gte: query.params.dateTimeRange.startTime
      };
    }

    orClauses.push(orClause);
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
