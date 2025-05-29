import { Blog } from '../../db/types';

export type BlogDTO = Blog;
export type BlogInputDTO = Omit<Blog, 'id'>;
