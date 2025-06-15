import { Response } from 'express';
import { RepositoryNotFoundError } from './repository-not-found.error';
import { HttpStatus } from '../types/http-statuses';
import { DomainError } from './domain.error';
import { createErrorsMessages } from '../middleware/validation/input-validation-result.middleware';

export function errorsHandler(error: unknown, res: Response): void {
  if (error instanceof RepositoryNotFoundError) {
    const httpStatus = HttpStatus.NotFound;

    res.status(httpStatus).send(
      createErrorsMessages([
        {
          status: httpStatus,
          detail: error.message,
        },
      ]),
    );

    return;
  }

  if (error instanceof DomainError) {
    const httpStatus = HttpStatus.UnprocessableEntity;

    res.status(httpStatus).send(
      createErrorMessages([
        {
          status: httpStatus,
          source: error.source,
          detail: error.message,
          code: error.code,
        },
      ]),
    );

    return;
  }

  res.status(HttpStatus.InternalServerError);
  return;
}
