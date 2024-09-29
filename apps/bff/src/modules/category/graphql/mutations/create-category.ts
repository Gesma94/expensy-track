import type { MercuriusContext } from "mercurius";
import { type MutationResolvers } from "../../../../@types/graphql-generated.js";
import { CategoryTypeMapper } from "../mappers/category-type.js";
import { CategoryMapper } from "../mappers/category.js";
import { getGqlUnauthorizedResponse } from "../../../../common/utils/get-gql-unauthorized-response.js";
import { getGqlSuccessResponse } from "../../../../common/utils/get-gql-success-response.js";
import { CategoryIconMapper } from "../mappers/category-icon.js";

export const mutationCreateCategory: MutationResolvers<MercuriusContext>["createCategory"] = async (
  _parent,
  args,
  contextValue,
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
      icon: CategoryIconMapper.toPrisma(icon),
      type: CategoryTypeMapper.toPrisma(type),
    },
  });

  return getGqlSuccessResponse(CategoryMapper.toGraphql(category));
};
