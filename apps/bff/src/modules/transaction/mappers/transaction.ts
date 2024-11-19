import type { Transaction as TransactionPrisma } from '@expensy-track/prisma';
import type { Transaction as TransactionGraphql } from '#gql/graphql-generated.js';

export function TransactionToPrisma(transaction: TransactionGraphql | null): TransactionPrisma | null {
  if (transaction === null) {
    return null;
  }

  return {
    id: transaction.id,
    walletId: transaction.walletId,
    categoryId: transaction.categoryId ?? null,
    note: transaction.note ?? null,
    date: transaction.date,
    isParent: transaction.isParent,
    amount: transaction.amount,
    userId: transaction.userId,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
    walletFromId: null,
    walletToId: null,
    isTransfer: transaction.isTransfer,
    parentTransactionId: transaction.parentTransactionId ?? null
  };
}

export function TransactionToGraphql(transaction: TransactionPrisma | null): TransactionGraphql | null {
  if (transaction === null) {
    return null;
  }

  return {
    id: transaction.id,
    note: transaction.note,
    date: transaction.date,
    amount: transaction.amount,
    userId: transaction.userId,
    isParent: transaction.isParent,
    walletId: transaction.walletId,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
    isTransfer: transaction.isTransfer,
    categoryId: transaction.categoryId,
    parentTransactionId: transaction.parentTransactionId
  };
}
