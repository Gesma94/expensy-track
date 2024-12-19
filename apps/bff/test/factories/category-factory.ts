import { $Enums, type Category } from '@expensy-track/prisma';
import { faker } from '@faker-js/faker';

export function createFakeCategory(override?: Partial<Category>): Category {
  return {
    id: faker.string.uuid(),
    color: faker.color.rgb(),
    displayName: faker.word.noun(),
    icon: faker.helpers.enumValue($Enums.CategoryIcon),
    type: faker.helpers.arrayElement([$Enums.CategoryType.EXPANSE, $Enums.CategoryType.INCOME]),
    userId: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    parentCategoryId: null,
    ...override
  };
}
