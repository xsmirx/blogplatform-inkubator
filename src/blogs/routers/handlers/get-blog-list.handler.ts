import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { BlogQueryInput } from '../input/blog-query.input';
import { matchedData } from 'express-validator';

export const getBlogListHandler = async (req: Request, res: Response) => {
  try {
    const validatedData = matchedData<BlogQueryInput>(req);

    const { items, totalCount } = await blogsService.findMany(validatedData);

    const blogsViewModel = items.map(mapToBlogViewModel);
    res.status(HttpStatus.Ok).send({
      pagesCount: Math.ceil(totalCount / validatedData.pageSize),
      page: validatedData.pageNumber,
      pageSize: validatedData.pageSize,
      totalCount,
      items: blogsViewModel,
    });
  } catch (error) {
    errorsHandler(error, res);
  }
};
