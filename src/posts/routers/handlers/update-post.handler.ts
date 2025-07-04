import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostInputDTO } from '../../application/dto/post.dto';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const updatePostHandler = async (
  req: Request<{ id: string }, object, PostInputDTO>,
  res: Response,
) => {
  try {
    const postId = req.params.id;
    await postsService.update(postId, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    errorsHandler(error, res);
  }
};
