import { Request, Response } from 'express';
import { BlogInputDTO } from '../../dto/blog.dto';
import { blogsRepository } from '../../repositories/blogs.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogViewModel } from '../mappers/map-to-blog-view-model.util';

export const createBlogHandler = async (req: Request, res: Response) => {
  try {
    const body = req.body as BlogInputDTO;
    const newBlog = await blogsRepository.create({
      ...body,
      isMembership: false,
    });
    const blogViewModel = mapToBlogViewModel(newBlog);
    res.status(HttpStatus.Created).send(blogViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
