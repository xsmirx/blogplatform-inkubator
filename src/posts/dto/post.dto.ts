import { Post } from '../types/posts';

export type PostDTO = Post & { blogName: string };
export type PostInputDTO = Omit<PostDTO, 'id' | 'blogName'>;
