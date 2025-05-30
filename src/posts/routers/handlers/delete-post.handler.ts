import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsRepository } from '../../repositories/posts.repository';

export const deletePostHandler = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const postId = req.params.id;

  const blog = postsRepository.findById(postId);
  if (!blog) {
    res.sendStatus(HttpStatus.NotFound);
  } else {
    postsRepository.delete(postId);
    res.sendStatus(HttpStatus.NoContent);
  }
};
