import {
  EmailNotUniqueError,
  LoginNotUniqueError,
} from '../../core/errors/repository-not-found.error';
import { userRepository } from '../repositories/users.repository';
import { UserDB } from '../types/user-db';
import { UserDTO } from './dto/user.dto';

import bcrypt from 'bcryptjs';

class UsersService {
  public async createUser(data: UserDTO) {
    const userByEmail = await userRepository.findUserByEmail(data.email);
    if (userByEmail) {
      throw new EmailNotUniqueError('User with this email already exists');
    }
    const userByLogin = await userRepository.findUserByLogin(data.login);
    if (userByLogin) {
      throw new LoginNotUniqueError('User with this login already exists');
    }

    const saltedHash = await bcrypt.hash(data.password, 10);

    const user: UserDB = {
      login: data.login,
      email: data.email,
      saltedHash: saltedHash,
    };

    return await userRepository.createUser(user);
  }
}

export const usersService = new UsersService();
