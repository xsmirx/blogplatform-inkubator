import { Request, Response } from 'express';
import { BlogInputDTO } from '../../application/dto/blog.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.service';

export const updateBlogHandler = async (
  req: Request<{ id: string }, object, BlogInputDTO>,
  res: Response,
) => {
  try {
    const blogId = req.params.id;
    await blogsService.update(blogId, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
