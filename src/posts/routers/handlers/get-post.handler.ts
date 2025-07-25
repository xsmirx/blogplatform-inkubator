import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';
import { PostInputDTO } from '../../application/dto/post.dto';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/errors.handler';

export const getPostHandler = async (
  req: Request,
  res: Response<PostInputDTO>,
) => {
  try {
    const postId = req.params.id;
    const post = await postsService.findById(postId);
    const postViewModel = mapToPostViewModel(post);
    res.status(HttpStatus.Ok).send(postViewModel);
  } catch (error) {
    errorsHandler(error, res);
  }
};
