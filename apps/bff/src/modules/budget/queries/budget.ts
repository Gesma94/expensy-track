import type { MercuriusContext } from 'mercurius';
import type { QueryResolvers } from '#gql/graphql-generated.js';
import { getGqlEntityNotFoundResponse } from '#utils/get-gql-entity-not-found-response.js';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
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

  if (!budget) {
    return getGqlEntityNotFoundResponse(`budget '${args.input.id}' not found`);
  }

  return getGqlSuccessResponse(BudgetToGraphql(budget));
};
