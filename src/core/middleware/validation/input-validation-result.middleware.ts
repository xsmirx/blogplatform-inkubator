import { NextFunction, Request, Response } from 'express';
import { ValidationErrorType } from '../../types/validation-error';
import { ValidationErrorView } from '../../types/validation-error.dto';
import { FieldValidationError, validationResult } from 'express-validator';
import { HttpStatus } from '../../types/http-statuses';

export const createErrorsMessages = (
  errors: ValidationErrorType[],
): ValidationErrorView => ({ errorsMessages: errors });

export const inputValidationResultMiggleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)
    .formatWith((errors) => {
      const expressError = errors as FieldValidationError;
      return {
        field: expressError.path,
        message: expressError.msg,
      };
    })
    .array({ onlyFirstError: true });
  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).json(createErrorsMessages(errors));
  } else {
    next();
  }
};
