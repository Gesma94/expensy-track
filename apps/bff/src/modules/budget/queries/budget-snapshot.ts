import type { MercuriusContext } from 'mercurius';
import { GraphqlErrorCode, type QueryResolvers } from '#gql/graphql-generated.js';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import { getGqlUnsuccessResponse } from '#utils/get-gql-unsuccess-response.js';
import { getBudgetCurrentSnapshot } from '../utils/get-budget-snapshot.js';

export const queryBudgetSnapshot: QueryResolvers<MercuriusContext>['budgetSnapshot'] = async (
  _parent,
  args,
  contextValue
) => {
  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const { budgetId } = args.input;
  const budget = await contextValue.app.prisma.budget.findUnique({
    where: {
      id: budgetId,
      userId: contextValue.user.id
    }
  });

  if (!budget) {
    return getGqlUnsuccessResponse(
      GraphqlErrorCode.EntityNotFound,
      `budget with id ${budgetId} not found or not accessible`
    );
  }

  return getGqlSuccessResponse(await getBudgetCurrentSnapshot(contextValue, budget));
};
