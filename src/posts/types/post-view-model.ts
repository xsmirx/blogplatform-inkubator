import { Post } from './posts';

export interface PostViewModel extends Omit<Post, 'blogId'> {
  id: string;
  blogId: string;
}
