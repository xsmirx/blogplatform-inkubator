import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.service';

export const deleteBlogHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const blogId = req.params.id;
    await blogsService.delete(blogId);
    res.sendStatus(HttpStatus.NoContent);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
