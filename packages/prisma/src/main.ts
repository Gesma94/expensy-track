import { $Enums, Prisma, PrismaClient } from '@prisma/client';
import type {
  Budget,
  BudgetsOnCategories,
  BudgetsOnWallets,
  Category,
  GuestsOnWallets,
  Label,
  LabelsOnTransactions,
  Transaction,
  User,
  Wallet
} from '@prisma/client';
import { PrismaErrorCode } from './prisma-error-code.js';

export type {
  Category,
  Label,
  User,
  Budget,
  BudgetsOnCategories,
  BudgetsOnWallets,
  GuestsOnWallets,
  LabelsOnTransactions,
  Transaction,
  Wallet
};
export { PrismaClient, $Enums, Prisma, PrismaErrorCode };

export namespace $Utils {
  export type Models = keyof typeof Prisma.ModelName;
  export type ArgsType<T extends Models> = Prisma.TypeMap['model'][T]['operations']['findMany']['args'];
  export type WhereType<T extends Models> = NonNullable<ArgsType<T>['where']>;
  export type AndType<T extends Models> = NonNullable<WhereType<T>['AND']>;
  export type OrType<T extends Models> = NonNullable<WhereType<T>['OR']>;
}
