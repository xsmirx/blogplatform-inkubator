import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostInputDTO } from '../../dto/post.dto';
import { postsRepository } from '../../repositories/posts.repository';
import { blogsRepository } from '../../../blogs/repositories/blogs.repository';

export const updatePostHandler = (
  req: Request<{ id: string }, object, PostInputDTO>,
  res: Response,
) => {
  const postId = req.params.id;
  const post = postsRepository.findById(postId);
  const blog = blogsRepository.findById(req.body.blogId);

  if (!post || !blog) {
    res.sendStatus(HttpStatus.NotFound);
  } else {
    postsRepository.update(postId, req.body);
    res.sendStatus(HttpStatus.NoContent);
  }
};
