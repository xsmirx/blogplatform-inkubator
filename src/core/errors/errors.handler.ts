import { Response } from 'express';
import {
  EmailNotUniqueError,
  LoginNotUniqueError,
  RepositoryNotFoundError,
  WrongCredentioansError,
} from './repository-not-found.error';
import { HttpStatus } from '../types/http-statuses';
import { createErrorsMessages } from '../middleware/validation/input-validation-result.middleware';

export function errorsHandler(error: unknown, res: Response): void {
  if (error instanceof RepositoryNotFoundError) {
    res.sendStatus(HttpStatus.NotFound);
    return;
  }

  if (error instanceof EmailNotUniqueError) {
    res
      .status(HttpStatus.BadRequest)
      .send(
        createErrorsMessages([
          { field: 'email', message: 'email should be unique' },
        ]),
      );
    return;
  }

  if (error instanceof LoginNotUniqueError) {
    res
      .status(HttpStatus.BadRequest)
      .send(
        createErrorsMessages([
          { field: 'login', message: 'login should be unique' },
        ]),
      );
    return;
  }

  if (error instanceof WrongCredentioansError) {
    res.sendStatus(HttpStatus.Unauthorized);
    return;
  }

  res.sendStatus(HttpStatus.InternalServerError);
  return;
}
