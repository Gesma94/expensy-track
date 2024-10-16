import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { NotNullOrUndefined } from '#utils/not-null-or-undefined.js';
import { TransactionToGraphql } from '../mappers/transaction.js';

export const transactionParentTransactionLoader: Required<MercuriusLoaderTyped>['Transaction']['parentTransaction'] =
  async (queries, context) => {
    const parentTransactionIds = queries.map(query => query.obj.parentTransactionId).filter(NotNullOrUndefined);
    const transactions = await context.app.prisma.transaction.findMany({ where: { id: { in: parentTransactionIds } } });
    const graphqlTransactions = transactions.map(TransactionToGraphql).filter(NotNullOrUndefined);

    return queries.map(query => {
      if (query.obj.parentTransactionId == null) {
        return null;
      }

      return graphqlTransactions.find(transaction => transaction.id === query.obj.parentTransactionId) ?? null;
    });
  };
