import { Router } from 'express';
import { createUserHandler } from './handlers/create-user.handler';
import { userInputDtoValidationMiddleware } from '../validation/user.input-dto.validation-middleware';
import { inputValidationResultMiggleware } from '../../core/middleware/validation/input-validation-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';
import { paginationAndSortingValidation } from '../../core/middleware/validation/query-pagination-sorting.validation-middleware';
import { UserSortFields } from './inputs/user-sort-fields';
import { getUserListHandler } from './handlers/get-user-list.handler';
import { searchLoginTermValidationMiddleware } from '../../core/middleware/validation/search-login-term-validation.middleware';
import { searchEmailTermValidationMiddleware } from '../../core/middleware/validation/search-email-term-validation.middleware';

export const usersRouter = Router();

usersRouter
  .get(
    '/',
    superAdminGuardMiddleware,
    searchLoginTermValidationMiddleware,
    searchEmailTermValidationMiddleware,
    paginationAndSortingValidation(UserSortFields),
    inputValidationResultMiggleware,
    getUserListHandler,
  )
  .post(
    '/',
    superAdminGuardMiddleware,
    userInputDtoValidationMiddleware,
    inputValidationResultMiggleware,
    createUserHandler,
  )
  .delete('/id', superAdminGuardMiddleware, inputValidationResultMiggleware);
