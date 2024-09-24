import type { MercuriusContext } from "mercurius";
import { CategoryErrorCode, type QueryResolvers } from "../../../../@types/graphql-generated.js";
import { CategoryMapper } from "../mappers/category.js";

export const queryCategories: QueryResolvers<MercuriusContext>["categories"] = async (_parent, _args, contextValue) => {
  if (!contextValue.user) {
    return {
      __typename: "CategoryError",
      message: "user not found",
      error: CategoryErrorCode.UserNotFound,
    };
  }

  const categories = await contextValue.app.prisma.category.findMany({
    where: { userId: contextValue.user.id },
    include: { user: true },
  });

  return {
    __typename: "CategoriesResult",
    categories: categories.map(CategoryMapper.toGraphql).filter(x => x !== null),
  };
};
