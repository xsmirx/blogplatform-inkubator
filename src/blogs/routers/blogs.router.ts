import { Router } from 'express';
import { getBlogListHandler } from './handlers/get-blog-list.handler';
import { getBlogHandler } from './handlers/get-blog.handler';
import { createBlogHandler } from './handlers/create-blog.handler';
import { updateBlogHandler } from './handlers/update-blog.handler';
import { deleteBlogHandler } from './handlers/delete-blog.handler';
import { superAdminGuardMiddleware } from '../../auth/api/guards/super-admin.guard-middleware';
import { idValidation } from '../../core/middleware/validation/param-id.validation-middleware';
import { inputValidationResultMiggleware } from '../../core/middleware/validation/input-validation-result.middleware';
import { blogInputDTOValidation } from '../validation/blog.input-dto.validation-middleware';
import { paginationAndSortingValidation } from '../../core/middleware/validation/query-pagination-sorting.validation-middleware';
import { BlogSortField } from './input/blog-sort-fields';
import { getPostListHandler } from '../../posts/routers/handlers/get-post-list.handler';
import { PostSortField } from '../../posts/routers/input/post-sort-field';
import { blogIdValidation } from '../../core/middleware/validation/param-blog-id.validation-middleware';
import { postInputDtoValidationMiddleware } from '../../posts/validation/post.input-dto.validation-middleware';
import { createPostHandler } from '../../posts/routers/handlers/create-post.handler';
import { searchNameTermValidation } from '../../core/middleware/validation/suarch-name-term-validation-middleware';

export const blogsRouter = Router();

blogsRouter
  .get(
    '/',
    searchNameTermValidation,
    paginationAndSortingValidation(BlogSortField),
    inputValidationResultMiggleware,
    getBlogListHandler,
  )
  .get('/:id', idValidation, inputValidationResultMiggleware, getBlogHandler)
  .get(
    '/:blogId/posts',
    blogIdValidation,
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiggleware,
    getPostListHandler,
  )
  .post(
    '/',
    superAdminGuardMiddleware,
    blogInputDTOValidation,
    inputValidationResultMiggleware,
    createBlogHandler,
  )
  .post(
    '/:blogId/posts',
    superAdminGuardMiddleware,
    blogIdValidation,
    postInputDtoValidationMiddleware({ withBlogId: false }),
    inputValidationResultMiggleware,
    createPostHandler,
  )
  .put(
    '/:id',
    superAdminGuardMiddleware,
    idValidation,
    blogInputDTOValidation,
    inputValidationResultMiggleware,
    updateBlogHandler,
  )
  .delete(
    '/:id',
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiggleware,
    deleteBlogHandler,
  );
