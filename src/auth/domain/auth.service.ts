import { usersRepository } from '../../users/repositories/users.repository';
import bcrypt from 'bcryptjs';

class AuthService {
  public async checkCredentials(loginOrEmail: string, password: string) {
    const user = await usersRepository.findUserByLoginOrEmail(loginOrEmail);
    if (!user) return false;
    return await bcrypt.compare(password, user.saltedHash);
  }
}

export const authService = new AuthService();
