import { gql } from '../../../gql';

export const CREATE_WALLET = gql(`
    mutation CreateBudget($input: CreateBudgetInput!) {
      createBudget(input: $input) {
        success
        error { ... GraphqlError }
        result { id }
      }
    }
  `);
