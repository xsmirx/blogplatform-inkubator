import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const getPostListHandler = async (req: Request, res: Response) => {
  try {
    const posts = await postsService.findMany();
    const postsViewModel = posts.map(mapToPostViewModel);
    res.status(HttpStatus.Ok).send(postsViewModel);
  } catch (error) {
    errorsHandler(error, res);
  }
};
