import { Request, Response } from 'express';
import { PostInputDTO } from '../../dto/post.dto';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Post } from '../../types/posts';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';

export const createPostHandler = async (
  req: Request<object, object, PostInputDTO>,
  res: Response<Post>,
) => {
  try {
    const body = req.body;
    const newPost = await postsRepository.create(body);
    const postViewModel = mapToPostViewModel(newPost);

    res.status(HttpStatus.Created).send(postViewModel);
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
