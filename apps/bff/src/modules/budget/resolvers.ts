import type { Resolvers } from '#gql/graphql-generated.js';
import { mutationCreateBudget } from './mutations/create-budget.js';
import { mutationDeleteBudgets } from './mutations/delete-budets.js';
import { queryBudgetSnapshot } from './queries/budget-snapshot.js';
import { queryBudget } from './queries/budget.js';
import { queryBudgetsSnapshot } from './queries/budgets-snapshot.js';
import { queryBudgets } from './queries/budgets.js';

export const budgetResolvers: Resolvers = {
  Query: {
    budget: queryBudget,
    budgets: queryBudgets,
    budgetSnapshot: queryBudgetSnapshot,
    budgetsSnapshot: queryBudgetsSnapshot
  },
  Mutation: {
    createBudget: mutationCreateBudget,
    deleteBudgets: mutationDeleteBudgets
  }
};
