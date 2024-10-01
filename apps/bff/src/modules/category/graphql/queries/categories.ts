import type { MercuriusContext } from 'mercurius';
import type { QueryResolvers } from '../../../../@types/graphql-generated.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';
import { CategoryToGraphql } from '../mappers/category.js';

export const queryCategories: QueryResolvers<MercuriusContext>['categories'] = async (_parent, _args, contextValue) => {
  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const categories = await contextValue.app.prisma.category.findMany({
    where: { userId: contextValue.user.id }
  });

  return getGqlSuccessResponse(categories.map(CategoryToGraphql).filter(x => x !== null));
};
