import type { MercuriusContext } from "mercurius";
import { type MutationResolvers } from "../../../../@types/graphql-generated.js";
import { CategoryTypeMapper } from "../mappers/category-type.js";
import { CategoryMapper } from "../mappers/category.js";
import { getGqlUnauthorizedResponse } from "../../../../common/utils/get-gql-unauthorized-response.js";
import { getGqlSuccessResponse } from "../../../../common/utils/get-gql-success-response.js";

export const mutationCreateCategory: MutationResolvers<MercuriusContext>["createCategory"] = async (
  _parent,
  args,
  contextValue,
) => {
  const { displayName, type } = args.input;

  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const category = await contextValue.app.prisma.category.create({
    data: {
      displayName,
      userId: contextValue.user.id,
      type: CategoryTypeMapper.toPrisma(type),
    },
  });

  return getGqlSuccessResponse(CategoryMapper.toGraphql(category));
};
