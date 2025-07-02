import { Request, Response } from 'express';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { matchedData } from 'express-validator';
import { authService } from '../../application/auth.service';
import { AuthInputDto } from '../../types/auth.input-dto';
import { HttpStatus } from '../../../core/types/http-statuses';

export const authHandler = async (req: Request, res: Response) => {
  try {
    const { loginOrEmail, password } = matchedData<AuthInputDto>(req);
    const isSuccess = await authService.checkCredentials(
      loginOrEmail,
      password,
    );
    if (isSuccess) {
      res.sendStatus(HttpStatus.NoContent);
    } else {
      res.sendStatus(HttpStatus.Unauthorized);
    }
  } catch (error) {
    errorsHandler(error, res);
  }
};
