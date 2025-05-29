import { Router } from 'express';
import { db } from '../../db/in-memory.db';
import { HttpStatus } from '../../core/types/http-statuses';

export const testingRouter = Router();

testingRouter.delete('/', (req, res) => {
  db.blogs = [];
  db.posts = [];
  res.sendStatus(HttpStatus.NoContent);
  return;
});
