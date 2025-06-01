import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../../blogs/repositories/blogs.repository';

export const getPostListHandler = (req: Request, res: Response) => {
  const posts = postsRepository.findAll();
  res.status(HttpStatus.Ok).send(
    posts.map((post) => ({
      ...post,
      blogName:
        blogsRepository.findById(post.blogId)?.name || 'Unknown Blog Name',
    })),
  );
};
