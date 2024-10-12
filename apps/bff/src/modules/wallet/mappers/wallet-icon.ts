import { $Enums } from '@expensy-track/prisma';
import { WalletIcon } from '../../../@types/graphql-generated.js';

export function WalletIconToPrisma(categoryIcon: WalletIcon): $Enums.WalletIcon {
  switch (categoryIcon) {
    case WalletIcon.Amazon:
      return $Enums.WalletIcon.AMAZON;
    case WalletIcon.Bank:
      return $Enums.WalletIcon.BANK;
    case WalletIcon.Cardholder:
      return $Enums.WalletIcon.CARDHOLDER;
    case WalletIcon.Contactless:
      return $Enums.WalletIcon.CONTACTLESS;
    case WalletIcon.CreditCard:
      return $Enums.WalletIcon.CREDIT_CARD;
    case WalletIcon.Paypal:
      return $Enums.WalletIcon.PAYPAL;
    case WalletIcon.PiggyBank:
      return $Enums.WalletIcon.PIGGY_BANK;
    case WalletIcon.Vault:
      return $Enums.WalletIcon.VAULT;
    case WalletIcon.Wallet:
      return $Enums.WalletIcon.WALLET;
  }
}

export function WalletIconToGraphql(categoryIcon: $Enums.WalletIcon): WalletIcon {
  switch (categoryIcon) {
    case $Enums.WalletIcon.AMAZON:
      return WalletIcon.Amazon;
    case $Enums.WalletIcon.BANK:
      return WalletIcon.Bank;
    case $Enums.WalletIcon.CARDHOLDER:
      return WalletIcon.Cardholder;
    case $Enums.WalletIcon.CONTACTLESS:
      return WalletIcon.Contactless;
    case $Enums.WalletIcon.CREDIT_CARD:
      return WalletIcon.CreditCard;
    case $Enums.WalletIcon.PAYPAL:
      return WalletIcon.Paypal;
    case $Enums.WalletIcon.PIGGY_BANK:
      return WalletIcon.PiggyBank;
    case $Enums.WalletIcon.VAULT:
      return WalletIcon.Vault;
    case $Enums.WalletIcon.WALLET:
      return WalletIcon.Wallet;
  }
}
