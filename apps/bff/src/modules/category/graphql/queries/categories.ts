import type { MercuriusContext } from "mercurius";
import { GraphqlErrorCode, type QueryResolvers } from "../../../../@types/graphql-generated.js";
import { CategoryMapper } from "../mappers/category.js";
import { getGqlUnsuccessResponse } from "../../../../common/utils/get-gql-unsuccess-response.js";
import { getGqlSuccessResponse } from "../../../../common/utils/get-gql-success-response.js";

export const queryCategories: QueryResolvers<MercuriusContext>["categories"] = async (_parent, _args, contextValue) => {
  if (!contextValue.user) {
    return getGqlUnsuccessResponse(GraphqlErrorCode.UnauthorizedUser, "user not authorized");
  }

  const categories = await contextValue.app.prisma.category.findMany({
    where: { userId: contextValue.user.id },
  });

  return getGqlSuccessResponse(categories.map(CategoryMapper.toGraphql).filter(x => x !== null));
};
