import type { Budget as PrismaBudget } from '@expensy-track/prisma';
import type { MercuriusContext } from 'mercurius';
import { NotNullOrUndefined } from '#utils/not-null-or-undefined.js';
import type { BudgetSnapshot } from '../../../@types/graphql-generated.js';
import { TransactionToGraphql } from '../../transaction/mappers/transaction.js';
import { BudgetToGraphql } from '../mappers/budget.js';
import { getBudgetCurrentSnapshotDateTimeRange } from './get-budget-current-snapshot-date-time-range.js';

export async function getBudgetCurrentSnapshot(
  mercuriusContext: MercuriusContext,
  budget: PrismaBudget
): Promise<BudgetSnapshot> {
  const { dateTimeRange, remainingSpan } = getBudgetCurrentSnapshotDateTimeRange(budget);

  const budgetsOnCategories = await mercuriusContext.app.prisma.budgetsOnCategories.findMany({
    where: {
      budgetId: budget.id
    }
  });

  const budgetsOnWallets = await mercuriusContext.app.prisma.budgetsOnWallets.findMany({
    where: {
      budgetId: budget.id
    }
  });

  const transactions = await mercuriusContext.app.prisma.transaction.findMany({
    where: {
      categoryId: { in: budgetsOnCategories.map(x => x.categoryId) },
      walletId: { in: budgetsOnWallets.map(x => x.walletId) },
      date: {
        lte: dateTimeRange.endTime,
        gte: dateTimeRange.startTime
      }
    }
  });

  const actualExpense = transactions.reduce((acc, t) => acc + t.amount, 0);
  const remainingAllowance = budget.amount - actualExpense;

  const budgetSnapshot: BudgetSnapshot = {
    actualExpense,
    remainingAllowance,
    endDate: dateTimeRange.endTime,
    expectedExpense: budget.amount,
    budget: BudgetToGraphql(budget),
    startDate: dateTimeRange.startTime,
    remainingAllowanceInInterval: remainingAllowance / remainingSpan,
    transactions: transactions.map(TransactionToGraphql).filter(NotNullOrUndefined)
  };

  return budgetSnapshot;
}
