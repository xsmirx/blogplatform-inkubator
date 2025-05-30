import { Request, Response } from 'express';
import { BlogInputDTO } from '../../dto/blog.dto';
import { blogsRepository } from '../../repositories/blogs.repository';
import { HttpStatus } from '../../../core/types/http-statuses';

export const updateBlogHandler = (
  req: Request<{ id: string }, object, BlogInputDTO>,
  res: Response,
) => {
  const blogId = req.params.id;
  const blog = blogsRepository.findById(blogId);
  if (!blog) {
    res.sendStatus(HttpStatus.NotFound);
  } else {
    blogsRepository.update(blogId, req.body);
    res.sendStatus(HttpStatus.NoContent);
  }
};
