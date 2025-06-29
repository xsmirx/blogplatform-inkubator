import { query } from 'express-validator';

export const searchEmailTermValidationMiddleware =
  query('searchEmailTerm').default(null);
