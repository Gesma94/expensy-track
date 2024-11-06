import { differenceInDays, endOfMonth, startOfMonth } from 'date-fns';
import type { MercuriusContext } from 'mercurius';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import { getGqlUnsuccessResponse } from '#utils/get-gql-unsuccess-response.js';
import {
  type BudgetSnapshot,
  type DateTimeRange,
  GraphqlErrorCode,
  type InputMaybe,
  type QueryResolvers
} from '../../../@types/graphql-generated.js';
import { BudgetToGraphql } from '../mappers/budget.js';

export const queryBudgetSnapshot: QueryResolvers<MercuriusContext>['budgetSnapshot'] = async (
  _parent,
  args,
  contextValue
) => {
  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const dateTimeRange = getDateTimeRange(args.input.dateTimeRange);
  const remainingDays = differenceInDays(dateTimeRange.endTime, Date.now());

  const budget = await contextValue.app.prisma.budget.findUnique({
    where: {
      id: args.input.budgetId,
      userId: contextValue.user.id
    }
  });

  if (!budget) {
    return getGqlUnsuccessResponse(GraphqlErrorCode.UnauthorizedUser, 'we');
  }

  const categories = (
    await contextValue.app.prisma.budgetsOnCategories.findMany({
      where: {
        budgetId: args.input.budgetId
      },
      select: {
        category: true
      }
    })
  ).map(x => x.category);

  const wallets = (
    await contextValue.app.prisma.budgetsOnWallets.findMany({
      where: {
        budgetId: args.input.budgetId
      },
      select: {
        wallet: true
      }
    })
  ).map(x => x.wallet);

  const transactions = await contextValue.app.prisma.transaction.findMany({
    where: {
      categoryId: { in: categories.map(x => x.id) },
      walletId: { in: wallets.map(x => x.id) },
      date: {
        lte: dateTimeRange.endTime,
        gte: dateTimeRange.startTime
      }
    }
  });

  const actualExpense = transactions.reduce((acc, t) => {
    return acc + t.amount;
  }, 0);
  const remainingAllowance = budget.amount - actualExpense;

  const budgetSnapshot: BudgetSnapshot = {
    budget: BudgetToGraphql(budget),
    transactions,
    startDate: dateTimeRange.startTime,
    endDate: dateTimeRange.endTime,
    expectedExpense: budget.amount,
    actualExpense,
    remainingAllowance,
    remainingAllowanceDaily: remainingAllowance / remainingDays
  };

  return getGqlSuccessResponse(budgetSnapshot);
};

function getDateTimeRange(dateTimeRange?: InputMaybe<DateTimeRange>): DateTimeRange {
  const now = new Date();

  return (
    dateTimeRange ?? {
      startTime: startOfMonth(now),
      endTime: endOfMonth(now)
    }
  );
}
