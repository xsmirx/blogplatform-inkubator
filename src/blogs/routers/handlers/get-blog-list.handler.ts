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

    queryDto.sortBy = queryDto.sortBy || 'createdAt';
    queryDto.sortDirection = queryDto.sortDirection || 'desc';
    queryDto.pageNumber = queryDto.pageNumber || 1;
    queryDto.pageSize = queryDto.pageSize || 10;

    const { items, totalCount } = await blogsService.findMany(queryDto);

    const blogsViewModel = items.map(mapToBlogViewModel);
    res.status(HttpStatus.Ok).send({
      pagesCount: Math.ceil(totalCount / queryDto.pageSize),
      page: queryDto.pageNumber,
      pageSize: queryDto.pageSize,
      totalCount,
      items: blogsViewModel,
    });
  } catch (erorr) {
    errorsHandler(erorr, res);
  }
};
