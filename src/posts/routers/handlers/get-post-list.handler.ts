import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { matchedData } from 'express-validator';
import { PostQueryInput } from '../input/post-query-input';

export const getPostListHandler = async (req: Request, res: Response) => {
  try {
    const validatedData = matchedData<PostQueryInput>(req);
    const { items, totalCount } = await postsService.findMany(validatedData);
    const postsViewModel = items.map(mapToPostViewModel);
    res.status(HttpStatus.Ok).send({
      pagesCount: Math.ceil(totalCount / validatedData.pageSize),
      page: validatedData.pageNumber,
      pageSize: validatedData.pageSize,
      totalCount,
      items: postsViewModel,
    });
  } catch (error) {
    errorsHandler(error, res);
  }
};
