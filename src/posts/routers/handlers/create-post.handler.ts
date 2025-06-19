import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Post } from '../../types/posts';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';
import { PostInputDTO } from '../../application/dto/post.dto';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const createPostHandler = async (
  req: Request<object, object, PostInputDTO>,
  res: Response<Omit<Post, 'blogId'> & { blogId: string }>,
) => {
  try {
    const body = req.body;
    const newPost = await postsService.create(body);
    const postViewModel = mapToPostViewModel(newPost);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch (error) {
    errorsHandler(error, res);
  }
};
