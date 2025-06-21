import { query } from 'express-validator';
import { SortDirection } from '../../types/sort-deriction';

export function paginationAndSortingValidation<T extends string>(
  sortFieldsEnum: Record<string, T>,
) {
  const allowedSortFields = Object.values(sortFieldsEnum);

  return [
    query('sortBy')
      .default(allowedSortFields[0])
      .isIn(allowedSortFields)
      .withMessage(
        `Invalid sort field. Allowed values: ${allowedSortFields.join(', ')}`,
      ),

    query('sortDirection')
      .default(SortDirection.desc)
      .isIn(Object.values(SortDirection))
      .withMessage(
        `Sort direction must be one of: ${Object.values(SortDirection).join(', ')}`,
      ),

    query('pageNumber')
      .default(1)
      .isInt({ min: 1 })
      .withMessage('Page number must be a positive integer')
      .toInt(),

    query('pageSize')
      .default(10)
      .isInt({ min: 1, max: 100 })
      .withMessage('Page size must be between 1 and 100')
      .toInt(),
  ];
}
