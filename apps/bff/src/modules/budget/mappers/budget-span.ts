import { $Enums } from '@expensy-track/prisma';
import { BudgetSpan } from '#gql/graphql-generated.js';

export function BudgetSpanToPrisma(budgetSpan: BudgetSpan): $Enums.BudgetSpan {
  switch (budgetSpan) {
    case BudgetSpan.Annual:
      return $Enums.BudgetSpan.ANNUAL;
    case BudgetSpan.Daily:
      return $Enums.BudgetSpan.DAILY;
    case BudgetSpan.Monthly:
      return $Enums.BudgetSpan.MONTHLY;
    case BudgetSpan.Weekly:
      return $Enums.BudgetSpan.WEEKLY;
  }
}

export function BudgetSpanToGraphql(budgetSpan: $Enums.BudgetSpan): BudgetSpan {
  switch (budgetSpan) {
    case $Enums.BudgetSpan.ANNUAL:
      return BudgetSpan.Annual;
    case $Enums.BudgetSpan.DAILY:
      return BudgetSpan.Daily;
    case $Enums.BudgetSpan.MONTHLY:
      return BudgetSpan.Monthly;
    case $Enums.BudgetSpan.WEEKLY:
      return BudgetSpan.Weekly;
  }
}
