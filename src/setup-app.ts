import express, { Express } from 'express';
import { testingRouter } from './testing/routers/testing.router';
import { blogsRouter } from './blogs/routers/blogs.router';
import { postsRouter } from './posts/routers/posts.router';
import { usersRouter } from './users/routers/users.router';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Hello API' });
  });

  app.use('/blogs', blogsRouter);
  app.use('/posts', postsRouter);
  app.use('/users', usersRouter);
  app.use('/testing/all-data', testingRouter);
};
