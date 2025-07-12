import { faker } from '@faker-js/faker';
import { UserDTO } from '../../../src/users/application/dto/user.dto';

export const getNewUser = (): UserDTO => {
  return {
    login:
      'user' +
      Date.now().toString().slice(-2) +
      `${faker.number.int({ min: 0, max: 99 })}`,
    password: faker.internet.password({ length: 10 }),
    email: faker.internet.email(),
  };
};
