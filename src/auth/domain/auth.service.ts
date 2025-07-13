import { usersRepository } from '../../users/repositories/users.repository';
import bcrypt from 'bcryptjs';
import { AuthInputDto } from '../types/auth.input-dto';
import { WrongCredentioansError } from '../../core/errors/repository-not-found.error';
import { jwtService } from '../adapters/jwt.service';

class AuthService {
  public async login({ loginOrEmail, password }: AuthInputDto) {
    const user = await this.checkCredentials({ loginOrEmail, password });

    if (!user) {
      throw new WrongCredentioansError();
    }

    const accessToken = jwtService.createToken({ userId: user._id.toString() });
    return accessToken;
  }

  public async checkCredentials({ loginOrEmail, password }: AuthInputDto) {
    const user = await usersRepository.findUserByLoginOrEmail(loginOrEmail);
    if (!user) return false;
    return (await bcrypt.compare(password, user.saltedHash)) ? user : false;
  }
}

export const authService = new AuthService();
