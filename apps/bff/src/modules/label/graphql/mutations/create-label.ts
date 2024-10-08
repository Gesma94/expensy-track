import type { MercuriusContext } from 'mercurius';
import type { MutationResolvers } from '../../../../@types/graphql-generated.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';
import { LabelToGraphql } from '../mappers/label-mapper.js';

export const mutationCreateLabel: MutationResolvers<MercuriusContext>['createLabel'] = async (
  _parent,
  args,
  contextValue
) => {
  const { displayName } = args.input;

  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const label = await contextValue.app.prisma.label.create({
    data: {
      displayName,
      userId: contextValue.user.id
    }
  });

  return getGqlSuccessResponse(LabelToGraphql(label));
};
