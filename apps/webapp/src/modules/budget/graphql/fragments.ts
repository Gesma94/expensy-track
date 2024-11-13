import { gql } from '../../../gql';

export const BUDGETS_PAGE_BUDGET_SNAPSHOT = gql(`
  fragment BudgetsPageBudgetSnapshot on BudgetSnapshot {
    budget {
      id
      displayName
    }
    actualExpense
    expectedExpense
    remainingAllowance
  }
`);
