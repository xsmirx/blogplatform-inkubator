import { body } from 'express-validator';

export const loginOrEmailValidation = body('loginOrEmail')
  .exists()
  .withMessage('Login or Email is required')
  .isString()
  .withMessage('Login or Email must be a string');

export const passwordValidation = body('password')
  .exists()
  .withMessage('Password is required')
  .isString()
  .withMessage('Password must be a string');

export const authInputDTOValidation = [
  loginOrEmailValidation,
  passwordValidation,
];
