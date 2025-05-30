import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogs.repository';
import { HttpStatus } from '../../../core/types/http-statuses';

export const getBlogHandler = (req: Request<{ id: string }>, res: Response) => {
  const blogId = req.params.id;

  const blog = blogsRepository.findById(blogId);

  if (!blog) {
    res.sendStatus(HttpStatus.NotFound);
  } else {
    res.status(HttpStatus.Ok).send(blog);
  }
};
