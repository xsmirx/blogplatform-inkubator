import { WithId } from 'mongodb';
import { BlogViewModel } from '../../types/blog-view-model';
import { Blog } from '../../types/blogs';

export const mapToBlogViewModel = (blog: WithId<Blog>): BlogViewModel => ({
  id: blog._id.toString(),
  name: blog.name,
  description: blog.description,
  websiteUrl: blog.websiteUrl,
  createdAt: blog.createdAt,
  isMembership: blog.isMembership,
});
