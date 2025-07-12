import express from 'express';
import request from 'supertest';
import { runDb } from '../../../src/db/mongo.db';
import { clearDb } from '../utils/clear-db';
import { setupApp } from '../../../src/setup-app';
import { getNewUser } from '../utils/getNewUser';

describe('Users API - Main Functionality', () => {
  const app = express();
  setupApp(app);

  beforeAll(async () => {
    await runDb('mongodb://admin:admin@localhost:27017', 'blogplatform-test');
    await clearDb(app);
  });

  it('shold return []; GET /users', async () => {
    await request(app)
      .get('/users')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .expect(200)
      .expect({
        pagesCount: 0,
        page: 1,
        pageSize: 10,
        totalCount: 0,
        items: [],
      });
  });

  let userId: string | null = null;
  const newUser = getNewUser();

  it('should create a new user; POST /users', async () => {
    const responce = await request(app)
      .post('/users')
      .set(
        'authorization',
        `Basic ${Buffer.from('admin:qwerty').toString('base64')}`,
      )
      .send(newUser)
      .expect(201);
    expect(responce.body).toEqual({
      id: expect.any(String),
      login: newUser.login,
      email: newUser.email,
      createdAt: expect.any(String),
    });
    userId = responce.body.id;
  });

  it('should return array of users; GET /users', async () => {});

  it('should return user; GET /users/:id', async () => {});

  it('should update user; PUT /users/:id', async () => {});

  it('should delete user; DELETE /users/:id', async () => {});
});
