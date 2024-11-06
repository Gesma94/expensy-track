import type { MercuriusContext } from 'mercurius';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import type { QueryResolvers } from '../../../@types/graphql-generated.js';
import { BudgetToGraphql } from '../mappers/budget.js';

export const queryBudget: QueryResolvers<MercuriusContext>['budget'] = async (_parent, args, contextValue) => {
  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const budget = await contextValue.app.prisma.budget.findUnique({
    where: {
      id: args.input.id,
      userId: contextValue.user.id
    }
  });

  return getGqlSuccessResponse(BudgetToGraphql(budget));
};