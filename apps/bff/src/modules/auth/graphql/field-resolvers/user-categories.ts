import type { MercuriusContext } from 'mercurius';
import type { UserResolvers } from '../../../../@types/graphql-generated.js';
import { CategoryToGraphql } from '../../../category/graphql/mappers/category.js';

export const userCategoriesFieldResolvers: UserResolvers<MercuriusContext>['categories'] = async (
  user,
  _args,
  contextValue
) => {
  if (!contextValue.user) {
    contextValue.app.log.warn(`could not retrieve categories for user ${user.id}`);
  }

  const categories = await contextValue.app.prisma.category.findMany({
    where: { userId: user.id }
  });

  return categories.map(CategoryToGraphql).filter(x => x !== null);
};
