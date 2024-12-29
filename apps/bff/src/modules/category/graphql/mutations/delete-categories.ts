import type { MercuriusContext } from 'mercurius';
import { concat, unique } from 'remeda';
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

  try {
    const result = await contextValue.app.prisma.$transaction(async tx => {
      // getting all sub-categories of removed categories
      const subCategories = await tx.category.findMany({
        where: {
          userId: user.id,
          parentCategoryId: { in: ids }
        }
      });

      const categoriesIdsToDelete = unique(
        concat(
          ids,
          subCategories.map(x => x.id)
        )
      );

      await tx.transaction.updateMany({
        where: { userId: user.id, categoryId: { in: categoriesIdsToDelete } },
        data: { categoryId: null }
      });

      await tx.budgetsOnCategories.deleteMany({
        where: { userId: user.id, categoryId: { in: categoriesIdsToDelete } }
      });

      return await tx.category.deleteMany({ where: { userId: user.id, id: { in: categoriesIdsToDelete } } });
    });

    return result
      ? getGqlSuccessResponse(result.count)
      : getGqlUnsuccessResponse(GraphqlErrorCode.OperationFailed, 'could not delete categories from database');
  } catch (error) {
    contextValue.app.log.error(error);
    return getGqlUnsuccessResponse(GraphqlErrorCode.OperationFailed, 'could not delete categories from database');
  }
};
