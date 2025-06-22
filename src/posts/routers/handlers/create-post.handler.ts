import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Post } from '../../types/posts';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';
import { PostInputDTO } from '../../application/dto/post.dto';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { matchedData } from 'express-validator';

export const createPostHandler = async (
  req: Request<object, object, PostInputDTO>,
  res: Response<Omit<Post, 'blogId'> & { blogId: string }>,
) => {
  try {
    const validatedData = matchedData<PostInputDTO>(req);
    console.log('Validated Data:', validatedData);

    const newPost = await postsService.create(validatedData);
    const postViewModel = mapToPostViewModel(newPost);
    res.status(HttpStatus.Created).send(postViewModel);
  } catch (error) {
    errorsHandler(error, res);
  }
};
