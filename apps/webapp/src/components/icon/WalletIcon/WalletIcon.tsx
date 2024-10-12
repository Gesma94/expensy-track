import {
  PiAmazonLogo,
  PiBank,
  PiCardholder,
  PiContactlessPayment,
  PiCreditCard,
  PiPaypalLogo,
  PiPiggyBank,
  PiVault,
  PiWallet
} from 'react-icons/pi';
import { WalletIcon as WalletIconEnum } from '../../../gql/graphql';

type Props = {
  icon: WalletIconEnum;
};

export const WalletIcon = ({ icon }: Props) => {
  switch (icon) {
    case WalletIconEnum.Amazon:
      return <PiAmazonLogo />;
    case WalletIconEnum.Bank:
      return <PiBank />;
    case WalletIconEnum.Cardholder:
      return <PiCardholder />;
    case WalletIconEnum.Contactless:
      return <PiContactlessPayment />;
    case WalletIconEnum.CreditCard:
      return <PiCreditCard />;
    case WalletIconEnum.Paypal:
      return <PiPaypalLogo />;
    case WalletIconEnum.PiggyBank:
      return <PiPiggyBank />;
    case WalletIconEnum.Vault:
      return <PiVault />;
    case WalletIconEnum.Wallet:
      return <PiWallet />;
  }
};
