import type { Transaction as GraphqlTransaction } from '#gql/graphql-generated.js';
import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { NotNullOrUndefined } from '#utils/not-null-or-undefined.js';
import { TransactionToGraphql } from '../mappers/transaction.js';

export const transactionSubTransactionsLoader: Required<MercuriusLoaderTyped>['Transaction']['subTransactions'] =
  async (queries, context) => {
    const parentTransactionIds = queries.map(query => query.obj.parentTransactionId).filter(NotNullOrUndefined);
    const transactions = await context.app.prisma.transaction.findMany({
      where: { parentTransactionId: { in: parentTransactionIds } }
    });

    const graphqlTransactionsByParentTransactionId: { [key: string]: GraphqlTransaction[] } = {};

    transactions.forEach(transaction => {
      const graphqlTransaction = TransactionToGraphql(transaction);

      if (!graphqlTransaction || !transaction.parentTransactionId) {
        return;
      }

      if (!(transaction.parentTransactionId in graphqlTransactionsByParentTransactionId)) {
        graphqlTransactionsByParentTransactionId[transaction.parentTransactionId] = [];
      }

      graphqlTransactionsByParentTransactionId[transaction.parentTransactionId]?.push(graphqlTransaction);
    });

    return queries.map(query => {
      if (!query.obj.isParent) {
        return null;
      }

      return graphqlTransactionsByParentTransactionId[query.obj.id] ?? [];
    });
  };
