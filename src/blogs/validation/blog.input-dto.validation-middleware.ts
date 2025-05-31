import { body } from 'express-validator';

const nameValidation = body('name')
  .exists()
  .withMessage('Name is required')
  .isString()
  .withMessage('Name must be a string')
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage('Name must be between 1 and 15 characters long');

const descriptionValidation = body('description')
  .exists()
  .withMessage('Description is required')
  .isString()
  .trim()
  .withMessage('Description must be a string')
  .isLength({ min: 1, max: 500 })
  .withMessage('Description must be between 1 and 500 characters long');

const websiteUrlValidation = body('websiteUrl')
  .exists()
  .withMessage('Website URL is required')
  .isString()
  .withMessage('Website URL must be a string')
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage('Website URL must be between 1 and 100 characters long')
  .isURL()
  .withMessage('Website URL must be a valid URL')
  .matches(
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
  )
  .withMessage('Description must be a valid URL starting with https://');

export const blogInputDTOValidation = [
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
];
