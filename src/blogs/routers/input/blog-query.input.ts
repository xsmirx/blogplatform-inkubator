import { PaginationAndSorting } from '../../../core/types/pagination-and-sorting';
import { BlogSortField } from './blog-sort-fields';

export type BlogQueryInput = PaginationAndSorting<BlogSortField> & {
  searchNameTerm?: string;
};
