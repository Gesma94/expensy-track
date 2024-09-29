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
  PiWallet,
} from "react-icons/pi";
import { CategoryIcon as CategoryIconEnum } from "../../gql/graphql";

type Props = {
  icon: CategoryIconEnum;
};

export const CategoryIcon = ({ icon }: Props) => {
  switch (icon) {
    case CategoryIconEnum.Activity:
      return <PiConfetti />;
    case CategoryIconEnum.Beer:
      return <PiBeerStein />;
    case CategoryIconEnum.Credit:
      return <PiCurrencyCircleDollar />;
    case CategoryIconEnum.CreditCard:
      return <PiCreditCard />;
    case CategoryIconEnum.DebtCollection:
      return <PiHandCoins />;
    case CategoryIconEnum.Gas:
      return <PiGasPump />;
    case CategoryIconEnum.Grocery:
      return <PiBasket />;
    case CategoryIconEnum.Investment:
      return <PiTrendUp />;
    case CategoryIconEnum.Medical:
      return <PiFirstAidKit />;
    case CategoryIconEnum.Miscellaneous:
      return <PiDotsThreeCircle />;
    case CategoryIconEnum.Money_1:
      return <PiMoney />;
    case CategoryIconEnum.Money_2:
      return <PiWallet />;
    case CategoryIconEnum.Money_3:
      return <PiMoneyWavy />;
    case CategoryIconEnum.Music:
      return <PiMusicNotes />;
    case CategoryIconEnum.Restourant:
      return <PiPizza />;
    case CategoryIconEnum.Salary:
      return <PiPiggyBank />;
    case CategoryIconEnum.Shopping:
      return <PiStorefront />;
    case CategoryIconEnum.Star:
      return <PiStar />;
    case CategoryIconEnum.Subscription:
      return <PiMegaphone />;
  }
};
