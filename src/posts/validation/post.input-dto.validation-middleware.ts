import { body } from 'express-validator';

const titleValidation = body('title')
  .isString()
  .withMessage('Title must be a string')
  .trim()
  .isLength({ min: 1, max: 20 })
  .withMessage('Title must be between 1 and 20 characters long');

const shortDescriptionValidation = body('shortDescription')
  .isString()
  .withMessage('Short description must be a string')
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage('Short description must be between 1 and 100 characters long');

const contentValidation = body('content')
  .isString()
  .withMessage('Content must be a string')
  .trim()
  .isLength({ min: 1, max: 1000 })
  .withMessage('Content must be between 1 and 1000 characters long');

const blogIdValidation = body('blogId')
  .isString()
  .withMessage('Blog ID must be a string')
  .trim()
  .isMongoId();

export const postInputDtoValidationMiddleware = ({
  withBlogId,
}: {
  withBlogId: boolean;
}) => [
  titleValidation,
  shortDescriptionValidation,
  contentValidation,
  ...(withBlogId ? [blogIdValidation] : []),
];
