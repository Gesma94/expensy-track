import { $Enums } from '@expensy-track/prisma';
import { faker } from '@faker-js/faker';
import { gql } from 'graphql-request';
import { describe, it } from 'vitest';
import {
  CategoryIcon,
  CategoryType,
  GraphqlErrorCode,
  type TestEditCategoryMutation,
  type TestEditCategoryMutationVariables
} from '#gql/graphql-generated.js';
import { createFakeCategory } from '../../factories/category-factory.js';
import { createFakeUser } from '../../factories/user-factory.js';
import { type DbTestEnvironmentContext, setupDbTestEnvironment } from '../../setups/setup-db-test-environment.js';
import { setGqlAuthTokens } from '../../setups/setup-gql-auth-tokens.js';

const mutation = gql`
  mutation testEditCategory($input: EditCategoryInput!) {
    editCategory(input: $input) {
      success
      error {
        code
        message
      }
      result {
        id
        displayName
        color
        type
        icon
        userId
      }
    }
  }
`;

describe('edit category via GQL mutation', () => {
  setupDbTestEnvironment();

  it<DbTestEnvironmentContext>('should return entity not found error when user tries to edit a category that does not exist', async ({
    app,
    mercuriusClient,
    expect
  }) => {
    const anotherUser = createFakeUser();
    const { user } = await setGqlAuthTokens(app, mercuriusClient);

    const category1 = createFakeCategory({ id: '1', userId: user.id, type: $Enums.CategoryType.EXPANSE });
    const category2 = createFakeCategory({ id: '2', userId: user.id, type: $Enums.CategoryType.INCOME });
    const category3 = createFakeCategory({ id: '3', userId: anotherUser.id, type: $Enums.CategoryType.EXPANSE });
    const category4 = createFakeCategory({ id: '4', userId: anotherUser.id, type: $Enums.CategoryType.INCOME });

    await app.prisma.user.create({ data: anotherUser });
    await app.prisma.category.createMany({ data: [category1, category2, category3, category4] });

    const randomColor = faker.color.rgb();
    const randomDisplayName = faker.word.noun();
    const randomIcon = faker.helpers.enumValue(CategoryIcon);

    expect(await app.prisma.category.count()).toBe(4);
    expect(await app.prisma.category.findUnique({ where: { id: '5' } })).toBeNull();

    const mutationResponse = await mercuriusClient.mutate<TestEditCategoryMutation, TestEditCategoryMutationVariables>(
      mutation,
      {
        variables: {
          input: {
            id: '5',
            icon: randomIcon,
            color: randomColor,
            displayName: randomDisplayName
          }
        }
      }
    );

    expect(mutationResponse.errors).toBeUndefined();
    expect(mutationResponse.data.editCategory?.result).toBeNull();
    expect(mutationResponse.data.editCategory?.success).toBe(false);
    expect(mutationResponse.data.editCategory?.error?.code).toBe(GraphqlErrorCode.EntityNotFound);
    expect(await app.prisma.category.findUnique({ where: { id: '5' } })).toBeNull();
  });

  it<DbTestEnvironmentContext>('should return entity not found error when user tries to edit a category that he does not own', async ({
    app,
    mercuriusClient,
    expect
  }) => {
    const anotherUser = createFakeUser();
    const { user } = await setGqlAuthTokens(app, mercuriusClient);

    const category1 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.EXPANSE });
    const category2 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });
    const category3 = createFakeCategory({ userId: anotherUser.id, type: $Enums.CategoryType.EXPANSE });
    const category4 = createFakeCategory({ userId: anotherUser.id, type: $Enums.CategoryType.INCOME });

    await app.prisma.user.create({ data: anotherUser });
    await app.prisma.category.createMany({ data: [category1, category2, category3, category4] });

    const randomColor = faker.color.rgb();
    const randomDisplayName = faker.word.noun();
    const randomIcon = faker.helpers.enumValue(CategoryIcon);

    expect(await app.prisma.category.count()).toBe(4);
    expect(await app.prisma.category.findUnique({ where: { id: category3.id } })).toBeDefined();

    const mutationResponse = await mercuriusClient.mutate<TestEditCategoryMutation, TestEditCategoryMutationVariables>(
      mutation,
      {
        variables: {
          input: {
            id: category3.id,
            icon: randomIcon,
            color: randomColor,
            displayName: randomDisplayName
          }
        }
      }
    );

    expect(mutationResponse.errors).toBeUndefined();
    expect(mutationResponse.data.editCategory?.result).toBeNull();
    expect(mutationResponse.data.editCategory?.success).toBe(false);
    expect(mutationResponse.data.editCategory?.error?.code).toBe(GraphqlErrorCode.EntityNotFound);
    expect(await app.prisma.category.findUnique({ where: { id: category3.id } })).toBeDefined();
  });

  it<DbTestEnvironmentContext>('should update category when user tries to edit a category that he owns', async ({
    app,
    mercuriusClient,
    expect
  }) => {
    const anotherUser = createFakeUser();
    const { user } = await setGqlAuthTokens(app, mercuriusClient);

    const category1 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.EXPANSE });
    const category2 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });
    const category3 = createFakeCategory({ userId: anotherUser.id, type: $Enums.CategoryType.EXPANSE });
    const category4 = createFakeCategory({ userId: anotherUser.id, type: $Enums.CategoryType.INCOME });

    await app.prisma.user.create({ data: anotherUser });
    await app.prisma.category.createMany({ data: [category1, category2, category3, category4] });

    const randomColor = faker.color.rgb();
    const randomDisplayName = faker.word.noun();
    const randomIcon = faker.helpers.enumValue(CategoryIcon);

    expect(await app.prisma.category.count()).toBe(4);

    const mutationResponse = await mercuriusClient.mutate<TestEditCategoryMutation, TestEditCategoryMutationVariables>(
      mutation,
      {
        variables: {
          input: {
            id: category1.id,
            icon: randomIcon,
            color: randomColor,
            displayName: randomDisplayName
          }
        }
      }
    );

    expect(mutationResponse.errors).toBeUndefined();
    expect(mutationResponse.data.editCategory?.error).toBeNull();
    expect(mutationResponse.data.editCategory?.success).toBe(true);
    expect(mutationResponse.data.editCategory?.result?.userId).toBe(user.id);
    expect(mutationResponse.data.editCategory?.result?.icon).toBe(randomIcon);
    expect(mutationResponse.data.editCategory?.result?.color).toBe(randomColor);
    expect(mutationResponse.data.editCategory?.result?.type).toBe(CategoryType.Expanse);
    expect(mutationResponse.data.editCategory?.result?.displayName).toBe(randomDisplayName);

    expect(await app.prisma.category.count()).toBe(4);

    const prismaCategory = await app.prisma.category.findUnique({
      where: { id: mutationResponse.data.editCategory?.result?.id }
    });

    expect(prismaCategory).not.toBeNull();
    expect(prismaCategory?.userId).toBe(user.id);
    expect(prismaCategory?.icon).toBe(randomIcon);
    expect(prismaCategory?.color).toBe(randomColor);
    expect(prismaCategory?.type).toBe(CategoryType.Expanse);
    expect(prismaCategory?.displayName).toBe(randomDisplayName);
    expect(prismaCategory!.createdAt).lessThan(prismaCategory!.updatedAt);
  });
});
