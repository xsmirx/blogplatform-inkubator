import { body } from 'express-validator';

const loginValidation = body('login')
  .isString()
  .withMessage('Title must be a string')
  .trim()
  .isLength({ min: 3, max: 10 })
  .withMessage('Title must be between 1 and 20 characters long')
  .matches(/^[a-zA-Z0-9_-]*$/)
  .withMessage(
    'Title must contain only letters, numbers, underscores, or hyphens',
  );

const passwordValidation = body('password')
  .isString()
  .withMessage('Short description must be a string')
  .trim()
  .isLength({ min: 6, max: 20 })
  .withMessage('Short description must be between 1 and 20 characters long');

const contentValidation = body('email')
  .isString()
  .withMessage('Content must be a string')
  .isEmail()
  .withMessage('Content must be a valid email address');

export const userInputDtoValidationMiddleware = [
  loginValidation,
  passwordValidation,
  contentValidation,
];
