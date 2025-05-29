import { Request, Response } from 'express';
import { BlogInputDTO } from '../../dto/blog.dto';
import { blogsRepository } from '../../repositories/blogs.repository';

export const createBlogHandler = (req: Request, res: Response) => {
  const body = req.body as BlogInputDTO;
  const newBlog = blogsRepository.create(body);

  res.status(201).json(newBlog);
};
