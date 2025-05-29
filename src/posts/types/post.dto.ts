import { Post } from '../../db/types';

export type PostDTO = Post & { blogName: string };
