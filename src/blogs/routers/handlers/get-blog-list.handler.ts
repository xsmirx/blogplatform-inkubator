import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../repositories/blogs.repository';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';

export const getBlogListHandler = async (req: Request, res: Response) => {
  const blogs = await blogsRepository.findAll();
  const blogsViewModel = blogs.map(mapToBlogViewModel);
  res.status(HttpStatus.Ok).send(blogsViewModel);
};
