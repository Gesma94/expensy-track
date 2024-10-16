import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { NotNullOrUndefined } from '#utils/not-null-or-undefined.js';
import { WalletToGraphql } from '../../wallet/mappers/wallet.js';

export const transactionWalletLoader: Required<MercuriusLoaderTyped>['Transaction']['wallet'] = async (
  queries,
  context
) => {
  const walletIds = queries.map(query => query.obj.walletId);
  const wallets = await context.app.prisma.wallet.findMany({ where: { id: { in: walletIds } } });
  const graphqlWallets = wallets.map(WalletToGraphql).filter(NotNullOrUndefined);

  return queries.map(query => {
    return graphqlWallets.find(wallet => wallet.id === query.obj.walletId) ?? null;
  });
};
