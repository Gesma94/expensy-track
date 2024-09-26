import type { MercuriusContext } from "mercurius";
import { LabelErrorCode, type QueryResolvers } from "../../../../@types/graphql-generated.js";
import { LabelMapper } from "../mappers/label-mapper.js";

export const queryLabels: QueryResolvers<MercuriusContext>["labels"] = async (_parent, _args, contextValue) => {
  if (!contextValue.user) {
    return {
      message: "user not found",
      __typename: "LabelsError",
      error: LabelErrorCode.UserNotFound,
    };
  }

  const labels = await contextValue.app.prisma.label.findMany({ where: { id: contextValue.user.id } });

  return {
    __typename: "LabelsResult",
    labels: labels.map(LabelMapper.toGraphql).filter(x => x !== null),
  };
};
