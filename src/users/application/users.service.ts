import { userRepository } from '../repositories/users.repository';
import { UserDB } from '../types/user-db';
import { UserDTO } from './dto/user.dto';

class UsersService {
  public async createUser(data: UserDTO) {
    // проверка на уникальность логина и email и прокидывание ошибки

    const user: UserDB = {
      login: data.login,
      email: data.email,
      createdAt: new Date().toISOString(),
      passwordHash: '', // здесь должен быть хэш пароля, но для примера оставим пустым
      passwordSalt: '', // здесь должен быть соль для хэша пароля, но для примера оставим пустым
    };

    return await userRepository.createUser(user);
  }
}

export const usersService = new UsersService();
