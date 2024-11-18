import { $Enums, type User } from '@expensy-track/prisma';
import { faker } from '@faker-js/faker';

export function createFakeUser(override?: Partial<User>): User {
  return {
    id: faker.string.uuid(),
    firebase_uid: null,
    email: faker.internet.email(),
    password: faker.internet.password({ length: 8 }),
    createdAt: new Date(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    updatedAt: new Date(),
    provider: $Enums.UserProvider.EMAIL,
    ...override
  };
}
