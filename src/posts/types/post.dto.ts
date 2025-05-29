import { Post } from '../../db/types';

export type PostDTO = Post & { blogName: string };
export type PostInputDTO = Omit<PostDTO, 'id' | 'blogName'>;
