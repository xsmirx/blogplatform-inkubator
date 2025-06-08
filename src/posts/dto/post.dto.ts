import { Post } from '../types/posts';

export type PostInputDTO = Omit<Post, 'id' | 'blogName' | 'createdAt'>;
