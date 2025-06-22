import { Blog } from '../../types/blogs';

export type BlogInputDTO = Omit<Blog, 'id' | 'createdAt' | 'isMembership'>;
