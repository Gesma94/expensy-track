import { $Enums, type Category as PrismaCategory } from '@expensy-track/prisma';
import { gql } from 'graphql-request';
import { describe, it } from 'vitest';
import type { Category as GqlCategory, TestGetCategoriesQuery } from '#gql/graphql-generated.js';
import { CategoryIconToGraphql } from '../../../src/modules/category/graphql/mappers/category-icon.js';
import { CategoryTypeToGraphql } from '../../../src/modules/category/graphql/mappers/category-type.js';
import { createFakeCategory } from '../../factories/category-factory.js';
import { createFakeUser } from '../../factories/user-factory.js';
import { type DbTestEnvironmentContext, setupDbTestEnvironment } from '../../setups/setup-db-test-environment.js';
import { setGqlAuthTokens } from '../../setups/setup-gql-auth-tokens.js';

const query = gql`
  query testGetCategories {
    categories {
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

describe('get user categories via GQL query', () => {
  setupDbTestEnvironment();

  it<DbTestEnvironmentContext>('should return user categories when user is authenticated', async ({
    app,
    mercuriusClient,
    expect
  }) => {
    const anotherUser = createFakeUser();
    const { user } = await setGqlAuthTokens(app, mercuriusClient);

    const category1 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.EXPANSE });
    const category2 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.EXPANSE });
    const category3 = createFakeCategory({ userId: user.id, type: $Enums.CategoryType.INCOME });
    const category4 = createFakeCategory({ userId: anotherUser.id, type: $Enums.CategoryType.EXPANSE });
    const category5 = createFakeCategory({ userId: anotherUser.id, type: $Enums.CategoryType.INCOME });

    await app.prisma.user.create({ data: anotherUser });
    await app.prisma.category.createMany({ data: [category1, category2, category3, category4, category5] });

    const allCategories = await app.prisma.category.findMany();
    expect(allCategories).toHaveLength(5);

    const queryResponse = await mercuriusClient.query<TestGetCategoriesQuery>(query);
    expect(queryResponse.errors).toBeUndefined();
    expect(queryResponse.data.categories?.error).toBeNull();
    expect(queryResponse.data.categories?.success).toBe(true);
    expect(queryResponse.data.categories?.result).toHaveLength(3);

    expectGqlCategory(queryResponse.data, category1);
    expectGqlCategory(queryResponse.data, category2);
    expectGqlCategory(queryResponse.data, category3);
    expect(queryResponse.data.categories?.result?.find(x => x.id === category4.id)).toBeUndefined();
    expect(queryResponse.data.categories?.result?.find(x => x.id === category5.id)).toBeUndefined();

    function expectGqlCategory(testGetCategoriesQueryData: TestGetCategoriesQuery, prismaCategory: PrismaCategory) {
      const gqlCategory = testGetCategoriesQueryData.categories?.result?.find(x => x.id === prismaCategory.id);

      expect(gqlCategory, `prisma category with id ${prismaCategory.id} not found`).toBeDefined();
      expect(gqlCategory?.color).toBe(prismaCategory.color);
      expect(gqlCategory?.userId).toBe(prismaCategory.userId);
      expect(gqlCategory?.displayName).toBe(prismaCategory.displayName);
      expect(gqlCategory?.icon).toBe(CategoryIconToGraphql(prismaCategory.icon));
      expect(gqlCategory?.type).toBe(CategoryTypeToGraphql(prismaCategory.type));
    }
  });
});
