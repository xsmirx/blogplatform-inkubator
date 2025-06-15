import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';
import { blogsService } from '../../application/blogs.service';

export const getBlogListHandler = async (req: Request, res: Response) => {
  try {
    const blogs = await blogsService.findMany();
    const blogsViewModel = blogs.map(mapToBlogViewModel);
    res.status(HttpStatus.Ok).send(blogsViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
