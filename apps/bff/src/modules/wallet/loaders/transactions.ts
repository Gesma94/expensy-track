import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import type { Transaction as GraphqlTransaction } from '../../../@types/graphql-generated.js';
import { TransactionToGraphql } from '../../transaction/mappers/transaction.js';

export const walletTransactionsLoader: Required<MercuriusLoaderTyped>['Wallet']['transactions'] = async (
  queries,
  context
) => {
  const walletIds = queries.map(query => query.obj.id);
  const transactions = await context.app.prisma.transaction.findMany({
    where: { walletId: { in: walletIds } }
  });
  const graphqlTransactionsByWalletId: { [key: string]: GraphqlTransaction[] } = {};

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
