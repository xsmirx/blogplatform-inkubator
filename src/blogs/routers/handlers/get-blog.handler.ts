import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';
import { blogsService } from '../../application/blogs.service';

export const getBlogHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const blogId = req.params.id;
    const blog = await blogsService.findByIdOrFail(blogId);
    const blogViewModel = mapToBlogViewModel(blog);
    res.status(HttpStatus.Ok).send(blogViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
