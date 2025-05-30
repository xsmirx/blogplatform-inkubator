import { Router } from 'express';
import { getBlogListHandler } from './handlers/get-blog-list.handler';
import { getBlogHandler } from './handlers/get-blog.handler';
import { createBlogHandler } from './handlers/create-blog.handler';
import { updateBlogHandler } from './handlers/update-blog.handler';
import { deleteBlogHandler } from './handlers/delete-blog.handler';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';

export const blogsRouter = Router();

blogsRouter
  .get('/', getBlogListHandler)
  .get('/:id', getBlogHandler)
  .post('/', superAdminGuardMiddleware, createBlogHandler)
  .put('/:id', superAdminGuardMiddleware, updateBlogHandler)
  .delete('/:id', superAdminGuardMiddleware, deleteBlogHandler);
