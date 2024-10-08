import type { MercuriusContext } from 'mercurius';
import { getGqlUnsuccessResponse } from '#utils/get-gql-unsuccess-response.js';
import { GraphqlErrorCode, type MutationResolvers } from '../../../../@types/graphql-generated.js';
import { getGqlSuccessResponse } from '../../../../common/utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '../../../../common/utils/get-gql-unauthorized-response.js';

export const mutationDeleteLabels: MutationResolvers<MercuriusContext>['deleteLabels'] = async (
  _parent,
  args,
  contextValue
) => {
  const { ids } = args.input;

  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const labels = await contextValue.app.prisma.label.deleteMany({ where: { id: { in: ids } } });

  return labels
    ? getGqlSuccessResponse(labels.count)
    : getGqlUnsuccessResponse(GraphqlErrorCode.DeleteManyFailed, 'could not delete labels from database');
};
