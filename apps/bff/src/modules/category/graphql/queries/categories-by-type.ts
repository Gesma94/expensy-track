import { $Enums, type Category as PrismaCategory } from '@expensy-track/prisma';
import type { MercuriusContext } from 'mercurius';
import { type Category, CategoryType, type QueryResolvers } from '#gql/graphql-generated.js';
import { NotNullOrUndefined } from '#utils/not-null-or-undefined.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';
import { getCategorySubCategories } from '../common/get-category-sub-categories.js';
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

  let incomeCategoriesCounter = 0;
  let expanseCategoriesCounter = 0;
  const incomeCategories: Category[] = [];
  const expanseCategories: Category[] = [];

  for (const prismaCategory of categories) {
    const gqlCategory = CategoryToGraphql(prismaCategory);

    if (!gqlCategory) {
      continue;
    }

    gqlCategory.subCategories = await getCategorySubCategories(gqlCategory, contextValue);

    if (gqlCategory.type === CategoryType.Income) {
      incomeCategories.push(gqlCategory);
      incomeCategoriesCounter += 1 + (gqlCategory.subCategories?.length ?? 0);
    }
    if (gqlCategory.type === CategoryType.Expanse) {
      expanseCategories.push(gqlCategory);
      expanseCategoriesCounter += 1 + (gqlCategory.subCategories?.length ?? 0);
    }
  }

  return getGqlSuccessResponse({
    incomeCategories: {
      counter: incomeCategoriesCounter,
      categories: incomeCategories
    },
    expanseCategories: {
      counter: expanseCategoriesCounter,
      categories: expanseCategories
    }
  });
};
