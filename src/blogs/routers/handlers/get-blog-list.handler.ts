import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { BlogQueryInput } from '../input/blog-query.input';

export const getBlogListHandler = async (
  req: Request<unknown, unknown, unknown, BlogQueryInput>,
  res: Response,
) => {
  try {
    const queryDto = req.query;
    const blogs = await blogsService.findMany(queryDto);
    const blogsViewModel = blogs.map(mapToBlogViewModel);
    res.status(HttpStatus.Ok).send(blogsViewModel);
  } catch (erorr) {
    errorsHandler(erorr, res);
  }
};
