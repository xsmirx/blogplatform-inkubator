import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsService } from '../../application/posts.service';

export const deletePostHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const postId = req.params.id;
    await postsService.delete(postId);
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
