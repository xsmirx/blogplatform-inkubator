import { Request, Response } from 'express';
import { BlogInputDTO } from '../../application/dto/blog.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';
import { blogsService } from '../../application/blogs.service';

export const createBlogHandler = async (req: Request, res: Response) => {
  try {
    const body = req.body as BlogInputDTO;
    const newBlog = await blogsService.create(body);
    const mappedBlog = mapToBlogViewModel(newBlog);
    res.status(HttpStatus.Created).send(mappedBlog);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
