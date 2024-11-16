import {
  PiBasket,
  PiBeerStein,
  PiConfetti,
  PiCreditCard,
  PiCurrencyCircleDollar,
  PiDotsThreeCircle,
  PiFirstAidKit,
  PiGasPump,
  PiHandCoins,
  PiMegaphone,
  PiMoney,
  PiMoneyWavy,
  PiMusicNotes,
  PiPiggyBank,
  PiPizza,
  PiStar,
  PiStorefront,
  PiTrendUp,
  PiWallet
} from 'react-icons/pi';
import { CategoryIcon as CategoryIconEnum } from '../../../../gql/graphql';

type Props = {
  icon: CategoryIconEnum;
};

export const CategoryIcon = ({ icon }: Props) => {
  switch (icon) {
    case CategoryIconEnum.Activity:
      return <PiConfetti className='w-full h-full' />;
    case CategoryIconEnum.Beer:
      return <PiBeerStein className='w-full h-full' />;
    case CategoryIconEnum.Credit:
      return <PiCurrencyCircleDollar className='w-full h-full' />;
    case CategoryIconEnum.CreditCard:
      return <PiCreditCard className='w-full h-full' />;
    case CategoryIconEnum.DebtCollection:
      return <PiHandCoins className='w-full h-full' />;
    case CategoryIconEnum.Gas:
      return <PiGasPump className='w-full h-full' />;
    case CategoryIconEnum.Grocery:
      return <PiBasket className='w-full h-full' />;
    case CategoryIconEnum.Investment:
      return <PiTrendUp className='w-full h-full' />;
    case CategoryIconEnum.Medical:
      return <PiFirstAidKit className='w-full h-full' />;
    case CategoryIconEnum.Miscellaneous:
      return <PiDotsThreeCircle className='w-full h-full' />;
    case CategoryIconEnum.Money_1:
      return <PiMoney className='w-full h-full' />;
    case CategoryIconEnum.Money_2:
      return <PiWallet className='w-full h-full' />;
    case CategoryIconEnum.Money_3:
      return <PiMoneyWavy className='w-full h-full' />;
    case CategoryIconEnum.Music:
      return <PiMusicNotes className='w-full h-full' />;
    case CategoryIconEnum.Restourant:
      return <PiPizza className='w-full h-full' />;
    case CategoryIconEnum.Salary:
      return <PiPiggyBank className='w-full h-full' />;
    case CategoryIconEnum.Shopping:
      return <PiStorefront className='w-full h-full' />;
    case CategoryIconEnum.Star:
      return <PiStar className='w-full h-full' />;
    case CategoryIconEnum.Subscription:
      return <PiMegaphone className='w-full h-full' />;
  }
};
