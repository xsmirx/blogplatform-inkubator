import { SortDirection } from './sort-deriction';

export type PaginationAndSorting<S> = {
  pageNumber: number;
  pageSize: number;
  sortBy: S;
  sortDirection: SortDirection;
};
