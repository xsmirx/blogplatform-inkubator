import { WithId } from 'mongodb';
import { Post } from '../../types/posts';
import { PostViewModel } from '../../types/post-view-model';

export const mapToPostViewModel = (post: WithId<Post>): PostViewModel => ({
  id: post._id.toString(),
  title: post.title,
  shortDescription: post.shortDescription,
  content: post.content,
  blogId: post.blogId.toString(),
  blogName: post.blogName,
  createdAt: post.createdAt,
});
