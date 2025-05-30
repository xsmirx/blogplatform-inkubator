import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';

export const getPostHandler = (req: Request, res: Response) => {
  const postId = req.params.id;

  const blog = postsRepository.findById(postId);
  if (!blog) {
    res.status(HttpStatus.NotFound);
  } else {
    res.status(HttpStatus.Ok).send(blog);
  }
};
