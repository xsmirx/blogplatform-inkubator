import { Router } from 'express';
import { createUserHandler } from './handlers/create-user.handler';
import { userInputDtoValidationMiddleware } from '../validation/user.input-dto.validation-middleware';
import { inputValidationResultMiggleware } from '../../core/middleware/validation/input-validation-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';

export const usersRouter = Router();

usersRouter.post(
  '/',
  superAdminGuardMiddleware,
  userInputDtoValidationMiddleware,
  inputValidationResultMiggleware,
  createUserHandler,
);
