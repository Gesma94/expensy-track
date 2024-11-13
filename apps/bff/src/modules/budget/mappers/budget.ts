import type { Budget as PrismaBudget } from '@expensy-track/prisma';
import type { Budget as GraphqlBudget } from '../../../@types/graphql-generated.js';
import { BudgetSpanToGraphql, BudgetSpanToPrisma } from './budget-span.js';

export function BudgetToGraphql(budget: PrismaBudget): GraphqlBudget {
  return {
    id: budget.id,
    displayName: budget.displayName,
    userId: budget.userId,
    amount: budget.amount,
    span: BudgetSpanToGraphql(budget.span),
    createdAt: budget.createdAt,
    updatedAt: budget.updatedAt
  };
}

export function BudgetToPrisma(budget: GraphqlBudget): PrismaBudget {
  return {
    id: budget.id,
    displayName: budget.displayName,
    userId: budget.userId,
    amount: budget.amount,
    span: BudgetSpanToPrisma(budget.span),
    createdAt: budget.createdAt,
    updatedAt: budget.createdAt
  };
}
