import { $Enums, type Category as PrismaCategory } from '@expensy-track/prisma';
import type { MercuriusContext } from 'mercurius';
import type { QueryResolvers } from '#gql/graphql-generated.js';
import { NotNullOrUndefined } from '#utils/not-null-or-undefined.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';
import { CategoryToGraphql } from '../mappers/category.js';

export const categoriesByTypeQuery: QueryResolvers<MercuriusContext>['categoriesByType'] = async (
  _parent,
  _args,
  contextValue
) => {
  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const categories = await contextValue.app.prisma.category.findMany({
    where: {
      userId: contextValue.user.id,
      parentCategoryId: null,
      type: {
        in: [$Enums.CategoryType.INCOME, $Enums.CategoryType.EXPANSE]
      }
    }
  });

  const incomePrismaCategories: PrismaCategory[] = [];
  const expansePrismaCategories: PrismaCategory[] = [];

  for (const category of categories) {
    if (category.type === $Enums.CategoryType.INCOME) {
      incomePrismaCategories.push(category);
    }
    if (category.type === $Enums.CategoryType.EXPANSE) {
      expansePrismaCategories.push(category);
    }
  }

  return getGqlSuccessResponse({
    incomeCategories: incomePrismaCategories.map(CategoryToGraphql).filter(NotNullOrUndefined),
    expanseCategories: expansePrismaCategories.map(CategoryToGraphql).filter(NotNullOrUndefined)
  });
};
