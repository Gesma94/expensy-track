import { faker } from '@faker-js/faker';
import { gql } from 'graphql-request';
import { describe, it } from 'vitest';
import { CategoryIcon, CategoryType } from '#gql/graphql-generated.js';
import type { TestCreateCategoryMutation, TestCreateCategoryMutationVariables } from '#gql/test-graphql-generated.js';
import { type DbTestEnvironmentContext, setupDbTestEnvironment } from '../../setups/setup-db-test-environment.js';
import { setGqlAuthTokens } from '../../setups/setup-gql-auth-tokens.js';

const mutation = gql`
  mutation testCreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      success
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

describe('', () => {
  setupDbTestEnvironment();

  it<DbTestEnvironmentContext>('create category via GQL mutation', async ({ app, mercuriusClient, expect }) => {
    const { user } = await setGqlAuthTokens(app, mercuriusClient);

    const randomColor = faker.color.rgb();
    const randomDisplayName = faker.word.noun();
    const randomIcon = faker.helpers.enumValue(CategoryIcon);

    const mutationResponse = await mercuriusClient.mutate<
      TestCreateCategoryMutation,
      TestCreateCategoryMutationVariables
    >(mutation, {
      variables: {
        input: {
          icon: randomIcon,
          color: randomColor,
          type: CategoryType.Expanse,
          displayName: randomDisplayName
        }
      }
    });

    expect(mutationResponse.errors).toBeUndefined();
    expect(mutationResponse.data.createCategory?.success).toBe(true);
    expect(mutationResponse.data.createCategory?.result?.userId).toBe(user.id);
    expect(mutationResponse.data.createCategory?.result?.icon).toBe(randomIcon);
    expect(mutationResponse.data.createCategory?.result?.color).toBe(randomColor);
    expect(mutationResponse.data.createCategory?.result?.type).toBe(CategoryType.Expanse);
    expect(mutationResponse.data.createCategory?.result?.displayName).toBe(randomDisplayName);

    expect(await app.prisma.user.count()).toBe(1);
    expect(await app.prisma.category.count()).toBe(1);

    const prismaCategory = await app.prisma.category.findUnique({
      where: { id: mutationResponse.data.createCategory?.result?.id }
    });

    expect(prismaCategory).not.toBeNull();
    expect(prismaCategory?.userId).toBe(user.id);
    expect(prismaCategory?.icon).toBe(randomIcon);
    expect(prismaCategory?.color).toBe(randomColor);
    expect(prismaCategory?.type).toBe(CategoryType.Expanse);
    expect(prismaCategory?.displayName).toBe(randomDisplayName);
  });
});
