import type { MercuriusContext } from "mercurius";
import { CategoryErrorCode, type MutationResolvers } from "../../../../@types/graphql-generated.js";
import { CategoryTypeMapper } from "../mappers/category-type.js";
import { CategoryMapper } from "../mappers/category.js";

export const mutationCreateCategory: MutationResolvers<MercuriusContext>["createCategory"] = async (
  _parent,
  args,
  contextValue,
) => {
  const { displayName, type } = args.input;

  if (!contextValue.user) {
    return {
      __typename: "CategoryError",
      message: "user not found",
      error: CategoryErrorCode.UserNotFound,
    };
  }

  const category = await contextValue.app.prisma.category.create({
    data: {
      displayName,
      userId: contextValue.user.id,
      type: CategoryTypeMapper.toPrisma(type),
    },
  });

  return {
    __typename: "CategoryResult",
    category: CategoryMapper.toGraphql(category),
  };
};
