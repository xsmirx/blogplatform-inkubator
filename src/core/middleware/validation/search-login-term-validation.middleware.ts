import { query } from 'express-validator';

export const searchLoginTermValidationMiddleware =
  query('searchLoginTerm').default(null);
