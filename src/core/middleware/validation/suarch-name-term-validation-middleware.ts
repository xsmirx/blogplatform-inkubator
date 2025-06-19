import { query } from 'express-validator';

export const searchNameTermValivation = query('searchNameTerm')
  .optional()
  .isString()
  .withMessage('Search name term must be a string');
