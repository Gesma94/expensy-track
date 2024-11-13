import { gql } from '../../../gql';

export const GET_BUDGETS_SNAPSHOT = gql(`
  query GetBudgetsSnapshot {
    budgetsSnapshot {
      success
      error { ... GraphqlError }
      result { ... BudgetsPageBudgetSnapshot }
    }
  }
`);

export const GET_CREATE_BUDGET_DEPS = gql(`
  query GetCreateBudgetDeps {
    categories {
      success
      error { ... GraphqlError }
      result { ... MyCategory }
    }

    wallets {
      success
      error { ... GraphqlError }
      result { ... WalletKeyValueFragment }
    }
  }
`);
