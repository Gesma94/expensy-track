import type { MercuriusContext } from "mercurius";
import { CategoryErrorCode, type QueryResolvers } from "../../../../@types/graphql-generated.js";
import { CategoryMapper } from "../mappers/category.js";

export const queryCategory: QueryResolvers<MercuriusContext>["category"] = async (_parent, args, contextValue) => {
  const { id } = args.input;

  if (!contextValue.user) {
    return {
      message: "user not found",
      __typename: "CategoryError",
      error: CategoryErrorCode.UserNotFound,
    };
  }

  const category = await contextValue.app.prisma.category.findFirst({ where: { id } });

  return {
    __typename: "CategoryResult",
    category: CategoryMapper.toGraphql(category),
  };
};
