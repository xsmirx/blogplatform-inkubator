import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogs.repository';
import { HttpStatus } from '../../../core/types/http-statuses';

export const deleteBlogHandler = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const blogId = req.params.id;

  const blog = await blogsRepository.findById(blogId);

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound);
  } else {
    await blogsRepository.delete(blogId);
    res.sendStatus(HttpStatus.NoContent);
  }
};
