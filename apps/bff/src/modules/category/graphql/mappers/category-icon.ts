import { $Enums } from "@expensy-track/prisma";
import { CategoryIcon } from "../../../../@types/graphql-generated.js";

export class CategoryIconMapper {
  public static toPrisma(graphqlEntity: CategoryIcon): $Enums.CategoryIcon {
    switch (graphqlEntity) {
      case CategoryIcon.Activity:
        return $Enums.CategoryIcon.ACTIVITY;
      case CategoryIcon.Beer:
        return $Enums.CategoryIcon.BEER;
      case CategoryIcon.Credit:
        return $Enums.CategoryIcon.CREDIT;
      case CategoryIcon.CreditCard:
        return $Enums.CategoryIcon.CREDIT_CARD;
      case CategoryIcon.DebtCollection:
        return $Enums.CategoryIcon.DEBT_COLLECTION;
      case CategoryIcon.Gas:
        return $Enums.CategoryIcon.GAS;
      case CategoryIcon.Grocery:
        return $Enums.CategoryIcon.GROCERY;
      case CategoryIcon.Investment:
        return $Enums.CategoryIcon.INVESTMENT;
      case CategoryIcon.Medical:
        return $Enums.CategoryIcon.MEDICAL;
      case CategoryIcon.Miscellaneous:
        return $Enums.CategoryIcon.MISCELLANEOUS;
      case CategoryIcon.Money_1:
        return $Enums.CategoryIcon.MONEY_1;
      case CategoryIcon.Money_2:
        return $Enums.CategoryIcon.MONEY_2;
      case CategoryIcon.Money_3:
        return $Enums.CategoryIcon.MONEY_3;
      case CategoryIcon.Music:
        return $Enums.CategoryIcon.MUSIC;
      case CategoryIcon.Restourant:
        return $Enums.CategoryIcon.RESTOURANT;
      case CategoryIcon.Salary:
        return $Enums.CategoryIcon.SALARY;
      case CategoryIcon.Shopping:
        return $Enums.CategoryIcon.SHOPPING;
      case CategoryIcon.Star:
        return $Enums.CategoryIcon.STAR;
      case CategoryIcon.Subscription:
        return $Enums.CategoryIcon.SUBSCRIPTION;
    }
  }

  public static toGraphql(prismaEntity: $Enums.CategoryIcon): CategoryIcon {
    switch (prismaEntity) {
      case $Enums.CategoryIcon.ACTIVITY:
        return CategoryIcon.Activity;
      case $Enums.CategoryIcon.BEER:
        return CategoryIcon.Beer;
      case $Enums.CategoryIcon.CREDIT:
        return CategoryIcon.Credit;
      case $Enums.CategoryIcon.CREDIT_CARD:
        return CategoryIcon.CreditCard;
      case $Enums.CategoryIcon.DEBT_COLLECTION:
        return CategoryIcon.DebtCollection;
      case $Enums.CategoryIcon.GAS:
        return CategoryIcon.Gas;
      case $Enums.CategoryIcon.GROCERY:
        return CategoryIcon.Grocery;
      case $Enums.CategoryIcon.INVESTMENT:
        return CategoryIcon.Investment;
      case $Enums.CategoryIcon.MEDICAL:
        return CategoryIcon.Medical;
      case $Enums.CategoryIcon.MISCELLANEOUS:
        return CategoryIcon.Miscellaneous;
      case $Enums.CategoryIcon.MONEY_1:
        return CategoryIcon.Money_1;
      case $Enums.CategoryIcon.MONEY_2:
        return CategoryIcon.Money_2;
      case $Enums.CategoryIcon.MONEY_3:
        return CategoryIcon.Money_3;
      case $Enums.CategoryIcon.MUSIC:
        return CategoryIcon.Music;
      case $Enums.CategoryIcon.RESTOURANT:
        return CategoryIcon.Restourant;
      case $Enums.CategoryIcon.SALARY:
        return CategoryIcon.Salary;
      case $Enums.CategoryIcon.SHOPPING:
        return CategoryIcon.Shopping;
      case $Enums.CategoryIcon.STAR:
        return CategoryIcon.Star;
      case $Enums.CategoryIcon.SUBSCRIPTION:
        return CategoryIcon.Subscription;
    }
  }
}
