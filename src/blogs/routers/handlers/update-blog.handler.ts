import { Request, Response } from 'express';
import { BlogInputDTO } from '../../application/dto/blog.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const updateBlogHandler = async (
  req: Request<{ id: string }, object, BlogInputDTO>,
  res: Response,
) => {
  try {
    const blogId = req.params.id;
    await blogsService.update(blogId, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (error) {
    errorsHandler(error, res);
  }
};
