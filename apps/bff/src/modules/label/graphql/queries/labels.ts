import type { MercuriusContext } from 'mercurius';
import type { QueryResolvers } from '../../../../@types/graphql-generated.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';
import { LabelToGraphql } from '../mappers/label-mapper.js';

export const queryLabels: QueryResolvers<MercuriusContext>['labels'] = async (_parent, _args, contextValue) => {
  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const labels = await contextValue.app.prisma.label.findMany({
    where: { userId: contextValue.user.id }
  });

  return getGqlSuccessResponse(labels.map(LabelToGraphql).filter(x => x !== null));
};
