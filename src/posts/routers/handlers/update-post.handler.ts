import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostInputDTO } from '../../dto/post.dto';
import { postsRepository } from '../../repositories/posts.repository';

export const updatePostHandler = async (
  req: Request<{ id: string }, object, PostInputDTO>,
  res: Response,
) => {
  try {
    const postId = req.params.id;
    const post = await postsRepository.findById(postId);

    if (!post) {
      res.sendStatus(HttpStatus.NotFound);
    } else {
      await postsRepository.update(postId, req.body);
      res.sendStatus(HttpStatus.NoContent);
    }
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
