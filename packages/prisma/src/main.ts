import { $Enums, PrismaClient } from '@prisma/client';
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
export { PrismaClient, $Enums };
