import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsRepository } from '../../repositories/posts.repository';

export const deletePostHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const postId = req.params.id;
    const post = await postsRepository.findById(postId);

    if (!post) {
      res.sendStatus(HttpStatus.NotFound);
    } else {
      await postsRepository.delete(postId);
      res.sendStatus(HttpStatus.NoContent);
    }
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
