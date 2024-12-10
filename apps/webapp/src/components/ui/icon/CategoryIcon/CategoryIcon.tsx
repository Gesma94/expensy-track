import { Text } from '@components/ui/Text/Text';
import type { ComponentProps } from 'react';
import { CategoryIcon as CategoryIconGqlEnum } from '../../../../gql/graphql';

type Props = ComponentProps<typeof Text> & {
  icon: CategoryIconGqlEnum;
};

function getEmojiFromCategoryIcon(categoryIcon: CategoryIconGqlEnum): string {
  switch (categoryIcon) {
    case CategoryIconGqlEnum.Confetti:
      return '🎉';
    case CategoryIconGqlEnum.Car:
      return '🚗';
    case CategoryIconGqlEnum.Ramen:
      return '🍜';
    case CategoryIconGqlEnum.Guitar:
      return '🎸';
    case CategoryIconGqlEnum.Briefcase:
      return '💼';
    case CategoryIconGqlEnum.Moneybag:
      return '💰';
    case CategoryIconGqlEnum.Pizza:
      return '🍕';
    case CategoryIconGqlEnum.Home:
      return '🏠';
    case CategoryIconGqlEnum.SoccerBall:
      return '⚽️';
    case CategoryIconGqlEnum.Popcorn:
      return '🍿';
  }
}

export const CategoryIcon = ({ icon, ...textProps }: Props) => {
  return <Text {...textProps}>{getEmojiFromCategoryIcon(icon)}</Text>;
};
