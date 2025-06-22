import { Router } from 'express';
import { getPostListHandler } from './handlers/get-post-list.handler';
import { getPostHandler } from './handlers/get-post.handler';
import { updatePostHandler } from './handlers/update-post.handler';
import { deletePostHandler } from './handlers/delete-post.handler';
import { createPostHandler } from './handlers/create-post.handler';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';
import { idValidation } from '../../core/middleware/validation/param-id.validation-middleware';
import { inputValidationResultMiggleware } from '../../core/middleware/validation/input-validation-result.middleware';
import { postInputDtoValidationMiddleware } from '../validation/post.input-dto.validation-middleware';
import { paginationAndSortingValidation } from '../../core/middleware/validation/query-pagination-sorting.validation-middleware';
import { PostSortField } from './input/post-sort-field';

export const postsRouter = Router();

postsRouter
  .get(
    '/',
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiggleware,
    getPostListHandler,
  )
  .get('/:id', idValidation, inputValidationResultMiggleware, getPostHandler)
  .post(
    '/',
    superAdminGuardMiddleware,
    postInputDtoValidationMiddleware,
    inputValidationResultMiggleware,
    createPostHandler,
  )
  .put(
    '/:id',
    superAdminGuardMiddleware,
    idValidation,
    postInputDtoValidationMiddleware,
    inputValidationResultMiggleware,
    updatePostHandler,
  )
  .delete(
    '/:id',
    superAdminGuardMiddleware,
    inputValidationResultMiggleware,
    idValidation,
    deletePostHandler,
  );
