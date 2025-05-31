import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../../blogs/repositories/blogs.repository';
import { PostDTO } from '../../dto/post.dto';

export const getPostHandler = (req: Request, res: Response<PostDTO>) => {
  const postId = req.params.id;
  const post = postsRepository.findById(postId);

  if (!post) {
    res.sendStatus(HttpStatus.NotFound);
  } else {
    const blogName = blogsRepository.findById(post.blogId)?.name;
    res.status(HttpStatus.Ok).send({ ...post, blogName: blogName ?? '' });
  }
};
