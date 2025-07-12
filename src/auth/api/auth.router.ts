import { Router } from 'express';
import { authInputDTOValidation } from '../middlewares/auth.input-dto.validation-middleware';
import { inputValidationResultMiggleware } from '../../core/middleware/validation/input-validation-result.middleware';
import { authHandler } from './handlers/auth.handler';

export const authRouter = Router();

authRouter.post(
  '/login',
  authInputDTOValidation,
  inputValidationResultMiggleware,
  authHandler,
);
