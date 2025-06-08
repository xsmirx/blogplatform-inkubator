import { Request, Response } from 'express';
import { postsRepository } from '../../repositories/posts.repository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostInputDTO } from '../../dto/post.dto';
import { mapToPostViewModel } from '../mappers/map-to-post-view-model.util';

export const getPostHandler = async (
  req: Request,
  res: Response<PostInputDTO>,
) => {
  try {
    const postId = req.params.id;
    const post = await postsRepository.findById(postId);

    if (!post) {
      res.sendStatus(HttpStatus.NotFound);
    } else {
      const postViowModel = mapToPostViewModel(post);
      res.status(HttpStatus.Ok).send(postViowModel);
    }
  } catch {
    res.sendStatus(HttpStatus.InternalServerError);
  }
};
