import { Router } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
import {
  userCollection,
  blogCollection,
  postCollection,
} from '../../db/mongo.db';

export const testingRouter = Router();

testingRouter.delete('/', async (req, res) => {
  await userCollection.deleteMany();
  await blogCollection.deleteMany();
  await postCollection.deleteMany();
  res.sendStatus(HttpStatus.NoContent);
  return;
});
