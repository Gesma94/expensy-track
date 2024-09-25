import type { MercuriusContext } from "mercurius";
import type { UserResolvers } from "../../../../@types/graphql-generated.js";
import { CategoryTypeMapper } from "../../../category/graphql/mappers/category-type.js";
import { CategoryMapper } from "../../../category/graphql/mappers/category.js";

export const userCategoriesFieldResolvers: UserResolvers<MercuriusContext>["categories"] = async (
  user,
  args,
  contextValue,
) => {
  if (!contextValue.user) {
    contextValue.app.log.warn(`could not retrieve categories for user ${user.id}`);
  }

  const inputType = args.input?.type;
  const categories = await contextValue.app.prisma.category.findMany({
    where: {
      userId: user.id,
      type: inputType ? CategoryTypeMapper.toPrisma(inputType) : undefined,
    },
  });

  return categories.map(CategoryMapper.toGraphql).filter(x => x !== null);
};
