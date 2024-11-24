import { $Enums } from '@expensy-track/prisma';
import { gql } from 'graphql-request';
import { describe, it } from 'vitest';
import type { TestDeleteCategoryMutation, TestDeleteCategoryMutationVariables } from '#gql/graphql-generated.js';
import { createFakeCategory } from '../../factories/category-factory.js';
import { createFakeTransaction } from '../../factories/transaction-factory.js';
import { createFakeUser } from '../../factories/user-factory.js';
import { createWalletUser } from '../../factories/wallet-factory.js';
import { type DbTestEnvironmentContext, setupDbTestEnvironment } from '../../setups/setup-db-test-environment.js';
import { setGqlAuthTokens } from '../../setups/setup-gql-auth-tokens.js';

const mutation = gql`
  mutation testDeleteCategory($input: DeleteCategoriesInput!) {
    deleteCategories(input: $input) {
      success
      error {
        code
        message
      }
      result
    }
  }
`;

describe('delete category via GQL mutation', () => {
  setupDbTestEnvironment();

  it<DbTestEnvironmentContext>('should delete provided categories when an user is correctly authenticated', async ({
    app,
    mercuriusClient,
    expect
  }) => {
    const { user } = await setGqlAuthTokens(app, mercuriusClient);

    const category1 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.EXPANSE });
    const category2 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });
    const category3 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });
    const category4 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });

    await app.prisma.category.createMany({ data: [category1, category2, category3, category4] });

    expect(await app.prisma.category.count()).toBe(4);

    const mutationResponse = await mercuriusClient.mutate<
      TestDeleteCategoryMutation,
      TestDeleteCategoryMutationVariables
    >(mutation, {
      variables: {
        input: {
          ids: [category1.id, category2.id, category3.id, category4.id]
        }
      }
    });

    expect(mutationResponse.errors).toBeUndefined();
    expect(mutationResponse.data.deleteCategories?.error).toBeNull();
    expect(mutationResponse.data.deleteCategories?.success).toBe(true);
    expect(mutationResponse.data.deleteCategories?.result).toBe(4);
    expect(await app.prisma.category.count()).toBe(0);
  });

  it<DbTestEnvironmentContext>('should delete categories owned by authenticated user when categories not owned are provided', async ({
    app,
    mercuriusClient,
    expect
  }) => {
    const anotherUser = createFakeUser();
    const { user } = await setGqlAuthTokens(app, mercuriusClient);

    const category1 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.EXPANSE });
    const category2 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });
    const category3 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });
    const category4 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });
    const category5 = createFakeCategory({ userId: anotherUser.id, type: $Enums.CategoryType.INCOME });
    const category6 = createFakeCategory({ userId: anotherUser.id, type: $Enums.CategoryType.EXPANSE });

    await app.prisma.user.create({ data: anotherUser });
    await app.prisma.category.createMany({ data: [category1, category2, category3, category4, category5, category6] });

    expect(await app.prisma.category.count()).toBe(6);

    const mutationResponse = await mercuriusClient.mutate<
      TestDeleteCategoryMutation,
      TestDeleteCategoryMutationVariables
    >(mutation, {
      variables: {
        input: {
          ids: [category1.id, category2.id, category3.id, category4.id, category5.id, category6.id]
        }
      }
    });

    expect(mutationResponse.errors).toBeUndefined();
    expect(mutationResponse.data.deleteCategories?.error).toBeNull();
    expect(mutationResponse.data.deleteCategories?.success).toBe(true);
    expect(mutationResponse.data.deleteCategories?.result).toBe(4);
    expect(await app.prisma.category.count()).toBe(2);
    expect(await app.prisma.category.findUnique({ where: { id: category5.id } })).toBeTruthy();
    expect(await app.prisma.category.findUnique({ where: { id: category6.id } })).toBeTruthy();
  });

  it<DbTestEnvironmentContext>('should set null category to transactions when their categories is deleted', async ({
    app,
    mercuriusClient,
    expect
  }) => {
    const { user } = await setGqlAuthTokens(app, mercuriusClient);

    const wallet = createWalletUser({ ownerId: user.id });
    const category1 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.EXPANSE });
    const category2 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });
    const category3 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });
    const category4 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });
    const transaction1 = createFakeTransaction({ userId: user.id, categoryId: category1.id, walletId: wallet.id });
    const transaction2 = createFakeTransaction({ userId: user.id, categoryId: category1.id, walletId: wallet.id });
    const transaction3 = createFakeTransaction({ userId: user.id, categoryId: category2.id, walletId: wallet.id });
    const transaction4 = createFakeTransaction({ userId: user.id, categoryId: category3.id, walletId: wallet.id });

    await app.prisma.wallet.create({ data: wallet });
    await app.prisma.category.createMany({ data: [category1, category2, category3, category4] });
    await app.prisma.transaction.createMany({ data: [transaction1, transaction2, transaction3, transaction4] });

    expect(await app.prisma.wallet.count()).toBe(1);
    expect(await app.prisma.category.count()).toBe(4);
    expect(await app.prisma.transaction.count()).toBe(4);

    const mutationResponse = await mercuriusClient.mutate<
      TestDeleteCategoryMutation,
      TestDeleteCategoryMutationVariables
    >(mutation, {
      variables: {
        input: {
          ids: [category1.id, category3.id]
        }
      }
    });

    expect(mutationResponse.errors).toBeUndefined();
    expect(mutationResponse.data.deleteCategories?.error).toBeNull();
    expect(mutationResponse.data.deleteCategories?.success).toBe(true);
    expect(mutationResponse.data.deleteCategories?.result).toBe(2);
    expect(await app.prisma.wallet.count()).toBe(1);
    expect(await app.prisma.category.count()).toBe(2);
    expect(await app.prisma.transaction.count()).toBe(4);
    expect(await app.prisma.transaction.findUnique({ where: { id: transaction1.id, categoryId: null } })).toBeTruthy();
    expect(await app.prisma.transaction.findUnique({ where: { id: transaction2.id, categoryId: null } })).toBeTruthy();
    expect(await app.prisma.transaction.findUnique({ where: { id: transaction4.id, categoryId: null } })).toBeTruthy();
  });
});
