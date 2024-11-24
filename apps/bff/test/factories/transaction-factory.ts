import type { Transaction } from '@expensy-track/prisma';
import { faker } from '@faker-js/faker';

export function createFakeTransaction(override?: Partial<Transaction>): Transaction {
  return {
    id: faker.string.uuid(),
    amount: faker.number.float({ min: 2, max: 99 }),
    date: new Date(),
    isParent: false,
    isTransfer: false,
    note: faker.string.sample(),
    userId: faker.string.uuid(),
    walletId: faker.string.uuid(),
    categoryId: null,
    walletFromId: null,
    walletToId: null,
    parentTransactionId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override
  };
}
