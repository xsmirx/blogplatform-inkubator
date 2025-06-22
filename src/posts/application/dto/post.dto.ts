import { Post } from '../../types/posts';

export type PostInputDTO = Omit<Post, 'blogId' | 'blogName' | 'createdAt'> & {
  blogId: string;
};
