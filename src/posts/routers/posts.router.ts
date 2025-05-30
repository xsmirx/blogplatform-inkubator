import { Router } from 'express';
import { getPostListHandler } from './handlers/get-post-list.handler';
import { getPostHandler } from './handlers/get-post.handler';
import { updatePostHandler } from './handlers/update-post.handler';
import { deletePostHandler } from './handlers/delete-post.handler';
import { createPostHandler } from './handlers/create-post.handler';

export const postsRouter = Router();

postsRouter
  .get('/', getPostListHandler)
  .get('/:id', getPostHandler)
  .post('/', createPostHandler)
  .put('/', updatePostHandler)
  .delete('/:id', deletePostHandler);
