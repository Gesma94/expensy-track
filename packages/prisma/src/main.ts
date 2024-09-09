import { PrismaClient, $Enums } from "@prisma/client";
import type {
  Category,
  Label,
  User,
  Budget,
  BudgetsOnCategories,
  BudgetsOnWallets,
  GuestsOnWallets,
  LabelsOnTransactions,
  Transaction,
  Wallet,
} from "@prisma/client";

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
  Wallet,
};
export { PrismaClient, $Enums };
