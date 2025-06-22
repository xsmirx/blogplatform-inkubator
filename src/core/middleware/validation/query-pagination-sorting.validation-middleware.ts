import { query } from 'express-validator';
import { SortDirection } from '../../types/sort-deriction';
import { SortQueryKey } from '../../types/sort-query-key';
import { PaginationQueryKey } from '../../types/pagiation-query-key';

export function paginationAndSortingValidation<T extends string>(
  sortFieldsEnum: Record<string, T>,
) {
  const allowedSortFields = Object.values(sortFieldsEnum);

  return [
    query(SortQueryKey.sortBy)
      .default(allowedSortFields[0])
      .isIn(allowedSortFields)
      .withMessage(
        `Invalid sort field. Allowed values: ${allowedSortFields.join(', ')}`,
      ),

    query(SortQueryKey.sortDirection)
      .default(SortDirection.desc)
      .isIn(Object.values(SortDirection))
      .withMessage(
        `Sort direction must be one of: ${Object.values(SortDirection).join(', ')}`,
      ),

    query(PaginationQueryKey.pageNumber)
      .default(1)
      .isInt({ min: 1 })
      .withMessage('Page number must be a positive integer')
      .toInt(),

    query(PaginationQueryKey.pageSize)
      .default(10)
      .isInt({ min: 1, max: 100 })
      .withMessage('Page size must be between 1 and 100')
      .toInt(),
  ];
}
