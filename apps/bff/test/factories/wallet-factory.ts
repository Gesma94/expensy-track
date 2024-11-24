import { $Enums, type User, type Wallet } from '@expensy-track/prisma';
import { faker } from '@faker-js/faker';

export function createWalletUser(override?: Partial<Wallet>): Wallet {
  return {
    id: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    currencyCode: $Enums.CurrencyCode.EUR,
    currentBalance: faker.number.float({ min: 50, max: 100 }),
    displayName: faker.word.adverb(),
    icon: faker.helpers.enumValue($Enums.WalletIcon),
    initialBalance: faker.number.float({ min: 50, max: 100 }),
    ownerId: faker.string.uuid(),
    ...override
  };
}
