import type { MercuriusContext } from 'mercurius';
import { GraphqlErrorCode, type MutationResolvers } from '#gql/graphql-generated.js';
import { getGqlUnsuccessResponse } from '#utils/get-gql-unsuccess-response.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';
import { CategoryToGraphql } from '../mappers/category.js';

export const mergeCategoriesMutation: MutationResolvers<MercuriusContext>['mergeCategories'] = async (
  _parent,
  args,
  contextValue
) => {
  const user = contextValue.user;
  const { sourceCategoryId, targetCategoryId } = args.input;

  if (!user) {
    return getGqlUnauthorizedResponse();
  }

  if (sourceCategoryId === targetCategoryId) {
    return getGqlUnsuccessResponse(
      GraphqlErrorCode.CannotMergeSameCategory,
      'cannot merge when target and source categories are the same'
    );
  }

  try {
    return await contextValue.app.prisma.$transaction(async tx => {
      const foundCategories = await tx.category.findMany({
        where: { userId: user.id, id: { in: [sourceCategoryId, targetCategoryId] } }
      });

      if (foundCategories.length !== 2) {
        return getGqlUnsuccessResponse(
          GraphqlErrorCode.OperationFailed,
          'cannot find one of the two provided categories'
        );
      }

      // update sub categories of source category, setting the target category as parent
      await tx.category.updateMany({
        where: {
          userId: user.id,
          parentCategoryId: sourceCategoryId
        },
        data: {
          parentCategoryId: targetCategoryId
        }
      });

      // updating all related transactions, setting the target category
      await tx.transaction.updateMany({
        where: { userId: user.id, categoryId: sourceCategoryId },
        data: { categoryId: targetCategoryId }
      });

      // deleting associations between source category and any budget
      await tx.budgetsOnCategories.deleteMany({
        where: {
          categoryId: sourceCategoryId
        }
      });

      // deleting the source category
      await tx.category.delete({ where: { userId: user.id, id: sourceCategoryId } });

      const targetCategory = CategoryToGraphql(
        await tx.category.findUnique({ where: { userId: user.id, id: targetCategoryId } })
      );

      return targetCategory
        ? getGqlSuccessResponse(targetCategory)
        : getGqlUnsuccessResponse(GraphqlErrorCode.OperationFailed, 'cannot find target category after merge');
    });
  } catch (error) {
    contextValue.app.log.error(error);
    return getGqlUnsuccessResponse(GraphqlErrorCode.OperationFailed, 'could not merge target and source categories');
  }
};
