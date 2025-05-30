import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostInputDTO } from '../../dto/post.dto';
import { postsRepository } from '../../repositories/posts.repository';

export const updatePostHandler = (
  req: Request<{ id: string }, object, PostInputDTO>,
  res: Response,
) => {
  const postId = req.params.id;
  const post = postsRepository.findById(postId);
  if (!post) {
    res.sendStatus(HttpStatus.NotFound);
  } else {
    postsRepository.update(postId, req.body);
    res.sendStatus(HttpStatus.NoContent);
  }
};
