import { Router } from 'express';
import { getPostListHandler } from './handlers/get-post-list.handler';
import { getPostHandler } from './handlers/get-post.handler';
import { updatePostHandler } from './handlers/update-post.handler';
import { deletePostHandler } from './handlers/delete-post.handler';
import { createPostHandler } from './handlers/create-post.handler';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';

export const postsRouter = Router();

postsRouter
  .get('/', getPostListHandler)
  .get('/:id', getPostHandler)
  .post('/', superAdminGuardMiddleware, createPostHandler)
  .put('/:id', superAdminGuardMiddleware, updatePostHandler)
  .delete('/:id', superAdminGuardMiddleware, deletePostHandler);
