import type { MercuriusContext } from 'mercurius';
import { GraphqlErrorCode, type MutationResolvers } from '#gql/graphql-generated.js';
import { getGqlUnsuccessResponse } from '#utils/get-gql-unsuccess-response.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';

export const mutationDeleteCategories: MutationResolvers<MercuriusContext>['deleteCategories'] = async (
  _parent,
  args,
  contextValue
) => {
  const user = contextValue.user;
  const { ids } = args.input;

  if (!user) {
    return getGqlUnauthorizedResponse();
  }

  const result = await contextValue.app.prisma.$transaction(async tx => {
    await tx.transaction.updateMany({
      where: { userId: user.id, categoryId: { in: ids } },
      data: { categoryId: null }
    });

    await tx.budgetsOnCategories.deleteMany({
      where: { userId: user.id, categoryId: { in: ids } }
    });

    return await contextValue.app.prisma.category.deleteMany({ where: { userId: user.id, id: { in: ids } } });
  });

  return result
    ? getGqlSuccessResponse(result.count)
    : getGqlUnsuccessResponse(GraphqlErrorCode.DeleteManyFailed, 'could not delete categories from database');
};
