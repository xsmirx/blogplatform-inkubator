import { param } from 'express-validator';

export const blogIdValidation = param('blogId')
  .exists()
  .withMessage('Id is required')
  .isString()
  .withMessage('Id must be a string')
  .isMongoId()
  .withMessage('Id must be a valid MongoDB ObjectId');
