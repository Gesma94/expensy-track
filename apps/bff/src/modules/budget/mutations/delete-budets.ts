import type { MercuriusContext } from 'mercurius';
import { GraphqlErrorCode, type MutationResolvers } from '#gql/graphql-generated.js';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import { getGqlUnsuccessResponse } from '#utils/get-gql-unsuccess-response.js';

export const mutationDeleteBudgets: MutationResolvers<MercuriusContext>['deleteBudgets'] = async (
  _parent,
  args,
  contextValue
) => {
  const user = contextValue.user;

  if (!user) {
    return getGqlUnauthorizedResponse();
  }

  const result = await contextValue.app.prisma.$transaction(async tx => {
    await tx.budgetsOnCategories.deleteMany({
      where: {
        budgetId: { in: args.input.ids },
        budget: {
          userId: user.id
        }
      }
    });

    await tx.budgetsOnWallets.deleteMany({
      where: {
        budgetId: { in: args.input.ids },
        budget: {
          userId: user.id
        }
      }
    });

    return await tx.budget.deleteMany({
      where: {
        id: { in: args.input.ids },
        userId: user.id
      }
    });
  });

  return result
    ? getGqlSuccessResponse(result.count)
    : getGqlUnsuccessResponse(GraphqlErrorCode.DeleteManyFailed, 'could not delete budgets');
};
