import { param } from 'express-validator';

export const idValidation = param('id')
  .exists()
  .withMessage('Id is required')
  .isString()
  .withMessage('Id must be a string')
  .isLength({ min: 1 })
  .withMessage('Id must be at least 1 character long');
