import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';

export const getPostListHandler = async (req: Request, res: Response) => {
  try {
    const posts = await postsRepository.findAll();
    const postsViewModel = posts.map(mapToPostViewModel);

    res.status(HttpStatus.Ok).send(postsViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
