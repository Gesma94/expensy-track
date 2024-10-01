import type { MercuriusContext } from 'mercurius';
import type { MutationResolvers } from '../../../../@types/graphql-generated.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';
import { CategoryIconToPrisma } from '../mappers/category-icon.js';
import { CategoryTypeToPrisma } from '../mappers/category-type.js';
import { CategoryToGraphql } from '../mappers/category.js';

export const mutationCreateCategory: MutationResolvers<MercuriusContext>['createCategory'] = async (
  _parent,
  args,
  contextValue
) => {
  const { displayName, type, color, icon } = args.input;

  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const category = await contextValue.app.prisma.category.create({
    data: {
      displayName,
      color: color,
      userId: contextValue.user.id,
      icon: CategoryIconToPrisma(icon),
      type: CategoryTypeToPrisma(type)
    }
  });

  return getGqlSuccessResponse(CategoryToGraphql(category));
};
