import { Request, Response } from 'express';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { matchedData } from 'express-validator';
import { authService } from '../../domain/auth.service';
import { AuthInputDto } from '../../types/auth.input-dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { AuthResponseDto } from '../../types/auth.response-dto';

export const authHandler = async (
  req: Request,
  res: Response<AuthResponseDto>,
) => {
  try {
    const { loginOrEmail, password } = matchedData<AuthInputDto>(req);
    const accessToken = await authService.login({
      loginOrEmail,
      password,
    });
    res.status(HttpStatus.Ok).send({ accessToken });
  } catch (error) {
    errorsHandler(error, res);
  }
};
