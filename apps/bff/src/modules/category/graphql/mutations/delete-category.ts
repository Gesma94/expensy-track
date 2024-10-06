import type { MercuriusContext } from 'mercurius';
import { getGqlUnsuccessResponse } from '#utils/get-gql-unsuccess-response.js';
import { GraphqlErrorCode, type MutationResolvers } from '../../../../@types/graphql-generated.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';
import { CategoryToGraphql } from '../mappers/category.js';

export const mutationDeleteCategory: MutationResolvers<MercuriusContext>['deleteCategory'] = async (
  _parent,
  args,
  contextValue
) => {
  const { id } = args.input;

  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const category = await contextValue.app.prisma.category.delete({ where: { id } });

  return category
    ? getGqlSuccessResponse(CategoryToGraphql(category))
    : getGqlUnsuccessResponse(GraphqlErrorCode.CategoryIdNotExist, 'category does not exist');
};
