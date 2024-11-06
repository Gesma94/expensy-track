import type { MercuriusContext } from 'mercurius';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import type { QueryResolvers } from '../../../@types/graphql-generated.js';
import { getBudgetCurrentSnapshot } from '../utils/get-budget-snapshot.js';

export const queryBudgetsSnapshot: QueryResolvers<MercuriusContext>['budgetsSnapshot'] = async (
  _parent,
  _args,
  contextValue
) => {
  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const budgets = await contextValue.app.prisma.budget.findMany({
    where: {
      userId: contextValue.user.id
    }
  });

  const budgetsSnapshot = await Promise.all(
    budgets.map(async budget => await getBudgetCurrentSnapshot(contextValue, budget))
  );

  return getGqlSuccessResponse(budgetsSnapshot);
};
