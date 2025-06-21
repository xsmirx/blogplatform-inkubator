import { query } from 'express-validator';

export const searchNameTermValivation = query('searchNameTerm')
  .optional()
  .default(null);
