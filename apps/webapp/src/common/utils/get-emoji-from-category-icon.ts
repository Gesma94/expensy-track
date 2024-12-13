import { CategoryIcon as CategoryIconGqlEnum } from '@gql/graphql';

export function getEmojiFromCategoryIcon(categoryIcon: CategoryIconGqlEnum): string {
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
