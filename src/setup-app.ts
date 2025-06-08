import express, { Express } from 'express';
// import { testingRouter } from './testing/routers/testing.router';
import { blogsRouter } from './blogs/routers/blogs.router';
// import { postsRouter } from './posts/routers/posts.router';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Hello API' });
  });

  app.use('/blogs', blogsRouter);
  // app.use('/posts', postsRouter);
  // app.use('/testing/all-data', testingRouter);
};
