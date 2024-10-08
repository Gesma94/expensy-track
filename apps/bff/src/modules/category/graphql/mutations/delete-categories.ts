import type { MercuriusContext } from 'mercurius';
import { getGqlUnsuccessResponse } from '#utils/get-gql-unsuccess-response.js';
import { GraphqlErrorCode, type MutationResolvers } from '../../../../@types/graphql-generated.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';

export const mutationDeleteCategories: MutationResolvers<MercuriusContext>['deleteCategories'] = async (
  _parent,
  args,
  contextValue
) => {
  const { ids } = args.input;

  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const categories = await contextValue.app.prisma.category.deleteMany({ where: { id: { in: ids } } });

  return categories
    ? getGqlSuccessResponse(categories.count)
    : getGqlUnsuccessResponse(GraphqlErrorCode.DeleteManyFailed, 'could not delete categories from database');
};
