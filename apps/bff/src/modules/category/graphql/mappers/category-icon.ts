import { $Enums } from '@expensy-track/prisma';
import { CategoryIcon } from '#gql/graphql-generated.js';

export function CategoryIconToPrisma(categoryIcon: CategoryIcon): $Enums.CategoryIcon {
  switch (categoryIcon) {
    case CategoryIcon.Confetti:
      return $Enums.CategoryIcon.CONFETTI;
    case CategoryIcon.Car:
      return $Enums.CategoryIcon.CAR;
    case CategoryIcon.Ramen:
      return $Enums.CategoryIcon.RAMEN;
    case CategoryIcon.Guitar:
      return $Enums.CategoryIcon.GUITAR;
    case CategoryIcon.Briefcase:
      return $Enums.CategoryIcon.BRIEFCASE;
    case CategoryIcon.Moneybag:
      return $Enums.CategoryIcon.MONEYBAG;
    case CategoryIcon.Pizza:
      return $Enums.CategoryIcon.PIZZA;
    case CategoryIcon.Home:
      return $Enums.CategoryIcon.HOME;
    case CategoryIcon.SoccerBall:
      return $Enums.CategoryIcon.SOCCER_BALL;
    case CategoryIcon.Popcorn:
      return $Enums.CategoryIcon.POPCORN;
  }
}

export function CategoryIconToGraphql(categoryIcon: $Enums.CategoryIcon): CategoryIcon {
  switch (categoryIcon) {
    case $Enums.CategoryIcon.CONFETTI:
      return CategoryIcon.Confetti;
    case $Enums.CategoryIcon.CAR:
      return CategoryIcon.Car;
    case $Enums.CategoryIcon.RAMEN:
      return CategoryIcon.Ramen;
    case $Enums.CategoryIcon.GUITAR:
      return CategoryIcon.Guitar;
    case $Enums.CategoryIcon.BRIEFCASE:
      return CategoryIcon.Briefcase;
    case $Enums.CategoryIcon.MONEYBAG:
      return CategoryIcon.Moneybag;
    case $Enums.CategoryIcon.PIZZA:
      return CategoryIcon.Pizza;
    case $Enums.CategoryIcon.HOME:
      return CategoryIcon.Home;
    case $Enums.CategoryIcon.SOCCER_BALL:
      return CategoryIcon.SoccerBall;
    case $Enums.CategoryIcon.POPCORN:
      return CategoryIcon.Popcorn;
  }
}
