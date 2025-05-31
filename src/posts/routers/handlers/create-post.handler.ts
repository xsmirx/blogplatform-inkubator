import { Request, Response } from 'express';
import { PostDTO, PostInputDTO } from '../../dto/post.dto';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsRepository } from '../../../blogs/repositories/blogs.repository';

export const createPostHandler = (
  req: Request<object, object, PostInputDTO>,
  res: Response<PostDTO>,
) => {
  const body = req.body;
  const newPost = postsRepository.create(body);
  const blog = blogsRepository.findById(body.blogId);

  if (!blog) {
    res.sendStatus(HttpStatus.BadRequest);
  } else {
    res.status(HttpStatus.Created).send({ ...newPost, blogName: blog.name });
  }
};
