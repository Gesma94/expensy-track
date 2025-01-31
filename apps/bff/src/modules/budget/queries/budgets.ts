import type { MercuriusContext } from 'mercurius';
import type { QueryResolvers } from '#gql/graphql-generated.js';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import { BudgetToGraphql } from '../mappers/budget.js';

export const queryBudgets: QueryResolvers<MercuriusContext>['budgets'] = async (_parent, _args, contextValue) => {
  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const budgets = await contextValue.app.prisma.budget.findMany({
    where: {
      userId: contextValue.user.id
    }
  });

  return getGqlSuccessResponse(budgets.map(BudgetToGraphql).filter(x => x !== null));
};
