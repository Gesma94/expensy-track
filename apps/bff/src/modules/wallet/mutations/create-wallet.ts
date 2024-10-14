import type { MercuriusContext } from 'mercurius';
import { getGqlSuccessResponse } from '#utils/get-gql-success-response.js';
import { getGqlUnauthorizedResponse } from '#utils/get-gql-unauthorized-response.js';
import type { MutationResolvers } from '../../../@types/graphql-generated.js';
import { CurrencyCodeToPrisma } from '../mappers/currency-code.js';
import { WalletToGraphql } from '../mappers/wallet.js';

export const mutationCreateWallet: MutationResolvers<MercuriusContext>['createWallet'] = async (
  _parent,
  args,
  contextValue
) => {
  const { displayName, currencyCode, icon, initialBalance } = args.input;

  if (!contextValue.user) {
    return getGqlUnauthorizedResponse();
  }

  const wallet = await contextValue.app.prisma.wallet.create({
    data: {
      icon,
      displayName,
      initialBalance,
      ownerId: contextValue.user.id,
      currentBalance: initialBalance,
      currencyCode: CurrencyCodeToPrisma(currencyCode)
    }
  });

  return getGqlSuccessResponse(WalletToGraphql(wallet));
};
