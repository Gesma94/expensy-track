import type { MercuriusLoaderTyped } from '#types/graphql-loaders.js';
import { Collection } from '#utils/collection.js';
import type { Wallet as GqlWallet } from '../../../@types/graphql-generated.js';
import { WalletToGraphql } from '../../wallet/mappers/wallet.js';

export const budgetWalletsLoader: Required<MercuriusLoaderTyped>['Budget']['wallets'] = async (queries, context) => {
  const budgetIds = queries.map(query => query.obj.id);
  const gqlBudgetsOnWallets = new Collection<GqlWallet>();

  const budgetsOnWallets = await context.app.prisma.budgetsOnWallets.findMany({
    where: { budgetId: { in: budgetIds } },
    include: { wallet: true }
  });

  budgetsOnWallets.forEach(budgetOnWallet => {
    const gqlWallet = WalletToGraphql(budgetOnWallet.wallet);

    if (!gqlWallet) {
      return;
    }

    gqlBudgetsOnWallets.add(budgetOnWallet.budgetId, gqlWallet);
  });

  return queries.map(query => gqlBudgetsOnWallets.get(query.obj.id) ?? []);
};
