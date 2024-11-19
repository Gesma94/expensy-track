import type { Wallet as WalletPrisma } from '@expensy-track/prisma';
import type { Wallet as WalletGraphql } from '#gql/graphql-generated.js';
import { CurrencyCodeToGraphql, CurrencyCodeToPrisma } from './currency-code.js';
import { WalletIconToGraphql } from './wallet-icon.js';

export function WalletToPrisma(wallet: WalletGraphql | null): WalletPrisma | null {
  if (wallet === null) {
    return null;
  }

  return {
    id: wallet.id,
    ownerId: wallet.ownerId,
    createdAt: wallet.createdAt,
    updatedAt: wallet.updatedAt,
    displayName: wallet.displayName,
    initialBalance: wallet.initialBalance,
    currentBalance: wallet.currentBalance,
    icon: WalletIconToGraphql(wallet.icon),
    currencyCode: CurrencyCodeToPrisma(wallet.currencyCode)
  };
}

export function WalletToGraphql(wallet: WalletPrisma | null): WalletGraphql | null {
  if (wallet === null) {
    return null;
  }

  return {
    id: wallet.id,
    ownerId: wallet.ownerId,
    createdAt: wallet.createdAt,
    updatedAt: wallet.updatedAt,
    displayName: wallet.displayName,
    initialBalance: wallet.initialBalance,
    currentBalance: wallet.currentBalance,
    icon: WalletIconToGraphql(wallet.icon),
    currencyCode: CurrencyCodeToGraphql(wallet.currencyCode)
  };
}
