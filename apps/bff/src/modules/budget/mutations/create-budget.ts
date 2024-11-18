import type { MercuriusContext } from 'mercurius';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import type { MutationResolvers } from '../../../@types/graphql-generated.js';
import { BudgetSpanToPrisma } from '../mappers/budget-span.js';
import { BudgetToGraphql } from '../mappers/budget.js';

export const mutationCreateBudget: MutationResolvers<MercuriusContext>['createBudget'] = async (
  _parent,
  args,
  contextValue
) => {
  const user = contextValue.user;
  const { displayName, amount, span, categoryIds, walletIds } = args.input;

  if (!user) {
    return getGqlUnauthorizedResponse();
  }

  const result = await contextValue.app.prisma.$transaction(async tx => {
    const budget = await tx.budget.create({
      data: {
        amount,
        displayName,
        span: BudgetSpanToPrisma(span),
        userId: user.id
      }
    });

    if (categoryIds && categoryIds?.length > 0) {
      await tx.budgetsOnCategories.createMany({
        data: categoryIds.map(categoryId => ({
          categoryId,
          userId: user.id,
          budgetId: budget.id
        }))
      });
    }

    if (walletIds && walletIds?.length > 0) {
      await tx.budgetsOnWallets.createMany({
        data: walletIds.map(walletId => ({
          walletId,
          userId: user.id,
          budgetId: budget.id
        }))
      });
    }

    return budget;
  });

  return getGqlSuccessResponse(BudgetToGraphql(result));
};
