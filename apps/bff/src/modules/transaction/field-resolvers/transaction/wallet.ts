import type { MercuriusContext } from 'mercurius';
import type { TransactionResolvers } from '../../../../@types/graphql-generated.js';
import { WalletToGraphql } from '../../../wallet/mappers/wallet.js';

export const transactionWalletFieldResolver: TransactionResolvers<MercuriusContext>['wallet'] = async (
  parent,
  _args,
  contextValue
) => {
  const wallet = await contextValue.app.prisma.wallet.findUnique({
    where: { id: parent.walletId }
  });

  return WalletToGraphql(wallet);
};
