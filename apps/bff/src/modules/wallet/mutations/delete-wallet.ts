import type { MercuriusContext } from 'mercurius';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import { getGqlUnsuccessResponse } from '#utils/get-gql-unsuccess-response.js';
import { GraphqlErrorCode, type MutationResolvers } from '../../../@types/graphql-generated.js';

export const mutationDeleteWallets: MutationResolvers<MercuriusContext>['deleteWallets'] = async (
  _parent,
  args,
  contextValue
) => {
  const { ids } = args.input;

  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const batchPayload = await contextValue.app.prisma.wallet.deleteMany({ where: { id: { in: ids } } });

  return batchPayload
    ? getGqlSuccessResponse(batchPayload.count)
    : getGqlUnsuccessResponse(GraphqlErrorCode.DeleteManyFailed, 'could not delete wallets from database');
};
