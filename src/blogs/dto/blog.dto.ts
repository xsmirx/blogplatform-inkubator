import { Blog } from '../types/blogs';

export type BlogDTO = Blog;
export type BlogInputDTO = Omit<Blog, 'id'>;
