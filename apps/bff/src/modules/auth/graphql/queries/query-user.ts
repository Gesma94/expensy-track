import type { MercuriusContext } from "mercurius";
import { UserErrorCode, type QueryResolvers } from "../../../../@types/graphql-generated.js";
import { UserMapper } from "../mappers/user-mapper.js";

export const queryUser: QueryResolvers<MercuriusContext>["user"] = async (_parent, _args, contextValue) => {
  if (!contextValue.user) {
    return {
      message: "user not found",
      __typename: "UserError",
      error: UserErrorCode.UserNotFound,
    };
  }

  const user = await contextValue.app.prisma.user.findUnique({ where: { id: contextValue.user.id } });

  return {
    __typename: "UserResult",
    user: UserMapper.toGraphql(user),
  };
};
