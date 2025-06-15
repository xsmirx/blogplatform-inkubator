import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';
import { postsService } from '../../application/posts.service';

export const getPostListHandler = async (req: Request, res: Response) => {
  try {
    const posts = await postsService.findMany();
    const postsViewModel = posts.map(mapToPostViewModel);
    res.status(HttpStatus.Ok).send(postsViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
