import jwt from 'jsonwebtoken';
import { settings } from '../../core/settings/settings';

class JwtServise {
  public createToken({ userId }: { userId: string }) {
    return jwt.sign({ userId }, settings.AC_SECRET, {
      expiresIn: settings.AC_TIME,
    });
  }
  public decodeToken(token: string) {}
  public verifyToken(token: string) {}
}

export const jwtService = new JwtServise();
