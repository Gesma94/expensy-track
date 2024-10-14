import type { Transaction as TransactionPrisma } from '@expensy-track/prisma';
import type { Transaction as TransactionGraphql } from '../../../@types/graphql-generated.js';

export function TransactionToPrisma(transaction: TransactionGraphql | null): TransactionPrisma | null {
  if (transaction === null) {
    return null;
  }

  return {
    id: transaction.id,
    walletId: transaction.walletId,
    categoryId: transaction.categoryId,
    isRecurring: false,
    isRecurrentTemplate: false,
    note: transaction.note ?? null,
    date: transaction.date,
    amount: transaction.amount,
    userId: transaction.userId,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
    endDate: null,
    startDate: null,
    frequency: null,
    walletFromId: null,
    walletToId: null
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
    walletId: transaction.walletId,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
    categoryId: transaction.categoryId
  };
}
