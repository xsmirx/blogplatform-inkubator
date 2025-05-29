import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogs.repository';

export const getBlogHandler = (req: Request, res: Response) => {
  const blogId = req.params.id;

  const blog = blogsRepository.findById(blogId);
  if (!blog) {
    res.status(404).json({ error: 'Blog not found' });
  }
  res.status(200).json(blog);
};
